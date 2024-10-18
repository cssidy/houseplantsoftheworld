import React, { createContext, useState } from 'react';

// Create the context
export const CountryContext = createContext();

// Create a provider component
export const CountryProvider = ({ children }) => {
    const [countryCodes, setCountryCodes] = useState();

    return (
        <CountryContext.Provider value={{ countryCodes, setCountryCodes }}>
            {children}
        </CountryContext.Provider>
    );
};
