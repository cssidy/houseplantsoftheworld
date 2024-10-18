import React from 'react';
import { CountryProvider} from "./components/CountryContext.jsx";
import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar";
import Map from "./components/Map.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
    return (
        <>
            <CountryProvider>
                <div className="flex flex-col flex-row sm:h-50 md:h-[15vh]">
                    <div className="w-full md:p-2">
                        <Navbar/>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row">
                    <div id="map-container" className="border sm:w-full md:w-1/2 h-[70vh] overflow-hidden">
                        <Map/>
                    </div>
                    <div className="sm:w-full md:w-1/2 h-1/2 sm:h-full p-2">
                        <Outlet/>
                    </div>
                </div>
                <div className="flex flex-col flex-row h-[5vh]">
                    <div className="w-full md:p-2">
                        <Footer/>
                    </div>
                </div>

            </CountryProvider>
        </>
    );
};
export default App

