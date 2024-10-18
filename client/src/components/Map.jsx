import React, {useEffect, useRef, useContext} from 'react';
import mapboxgl from 'mapbox-gl';
import {CountryContext} from './CountryContext';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
    const mapContainerRef = useRef();
    const mapRef = useRef();
    const {countryCodes} = useContext(CountryContext);
    const dataCache = useRef([]);
    const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    useEffect(() => {
        mapboxgl.accessToken = `${accessToken}`;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/light-v11',
            center: [-40, 30],
            zoom: 1.4
        });

        mapRef.current.on('load', () => {
            mapRef.current.addSource('countries', {
                type: 'vector',
                url: 'mapbox://mapbox.country-boundaries-v1'
            });
            updateMapLayer();  // Initial layer update
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            updateMapLayer();  // Update map whenever countryCodes change
        }
    }, [countryCodes]);

    const updateMapLayer = () => {
        if (!mapRef.current.getSource('countries')) return;

        const matchExpression = ['match', ['get', 'iso_3166_1_alpha_3']];

        const data = countryCodes;  // [{code: 'USA'}, {code: 'CAN'}]

        if (data !== undefined && Array.isArray(dataCache.current)) {
            let countryISO = data[0].code;

            async function getData(countryISO) {
                let itemFound = dataCache.current.find(item => item.hasOwnProperty(countryISO));
                if (itemFound) {
                    console.log("Key found in cache, returning coordinates...");
                    return itemFound[countryISO];
                } else {
                    console.log('Key not found in cache, fetching coordinates...');
                    try {
                        const response = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?country=${countryISO}&access_token=${accessToken}`);
                        const geoData = await response.json();
                        const coordinates = geoData.features[0].geometry.coordinates;
                        console.log("Fetched coordinates for", geoData.features[0].properties.full_address, coordinates);

                        // cache the coordinates
                        const newData = `{ ${countryISO}: ${coordinates} }`
                        dataCache.current.push({ [countryISO]: coordinates });
                        return coordinates;
                    } catch (error) {
                        console.error("Error fetching coordinates:", error);
                    }
                }
            }

            getData(countryISO).then((coordinates) => {
                if (coordinates) {
                    // Use the coordinates for the flyTo function
                    mapRef.current.flyTo({ center: coordinates });
                } else {
                    console.log('No coordinates available for flyTo.');
                }
            });

            for (const row of data) {
                const color = `rgb(80, 200, 120)`;
                matchExpression.push(row['code'], color);
            }

            // Default color
            matchExpression.push('rgba(0, 0, 0, 0)');

            // Add or update the layer
            if (mapRef.current.getLayer('countries-join')) {
                mapRef.current.setPaintProperty('countries-join', 'fill-color', matchExpression);
            } else {
                mapRef.current.addLayer(
                    {
                        id: 'countries-join',
                        type: 'fill',
                        source: 'countries',
                        'source-layer': 'country_boundaries',
                        paint: {
                            'fill-color': matchExpression
                        }
                    },
                    'admin-1-boundary-bg'
                );
            }
        }
    };

    return <div ref={mapContainerRef} id="map" style={{height: '100%'}}/>;
};

export default Map;
