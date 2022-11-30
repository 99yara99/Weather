import React from 'react';
export const CoordContext = React.createContext({
  coordsContext: {
    lat: null,
    lon: null,
  },
  setCoordsContext: () => {},
});
