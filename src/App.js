import './App.css';
import React from 'react';
import Main from './Components/Main/MainComponent/Main';
import Loading from './Components/Loading';
import TodaysHighlights from './Components/TodaysHighlights/TodaysHighlights';
import ForecastWeek from './Components/ForecastWeek/ForecastWeek';
import MyMap from './Components/Map/Map';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadWeather } from './redux/Slice/weathersSlice';
import { CoordContext } from './Components/Main/SearchBar/CoordContext';

// let coords = {
//   lat: null,
//   lon: null,
// };
// export const CoordContext = React.createContext({
//   coords,
//   getContext: () => {},
// });

function App() {
  // Context
  let coordsDefault = {
    lat: 50.4333,
    lon: 30.5167,
  };
  const [coordsContext, setCoordsContext] = useState(coordsDefault);
  const coords = { coordsContext, setCoordsContext };

  // Load weather from server

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      loadWeather({
        coord: {
          lat: 50.4333,
          lon: 30.5167,
        },
      })
    );
  }, [dispatch]);

  const { isLoading, error } = useSelector((state) => state.weather);

  //Rendering Error

  const renderError = () => {
    if (!error) return null;
    return <h2>Error occured: {error}</h2>;
  };

  // Set state for changing temperature
  const [isCelsius, setIsCelsius] = useState('metric');

  //Rendering App

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <CoordContext.Provider value={coords}>
          <div className="all">
            {renderError()}

            <div className="Main">
              <Main isCelsius={isCelsius} />
            </div>

            <div className="double">
              <div className="forecastTitle">
                <div>
                  <span>3 hours forecast</span>
                </div>
                <div className="tempIcon">
                  <button
                    style={{
                      backgroundColor:
                        isCelsius === 'metric' ? '#FFFFFF' : '#000000',
                      color: isCelsius === 'metric' ? '#000000' : '#FFFFFF',
                    }}
                    className="tempBtn"
                    type="submit"
                    onClick={() => setIsCelsius('metric')}
                  >
                    °C
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        isCelsius === 'fahrenheit' ? '#FFFFFF' : '#000000',
                      color: isCelsius === 'fahrenheit' ? '#000000' : '#FFFFFF',
                    }}
                    className="tempBtn"
                    type="button"
                    onClick={() => setIsCelsius('fahrenheit')}
                  >
                    °F
                  </button>
                </div>
              </div>

              <div className="forecastWeek">
                <ForecastWeek isCelsius={isCelsius} />
              </div>
              <div className="down">
                <div className="forecastTitle">
                  <span>Today's Highlights</span>
                </div>
                <div className="highMap">
                  <div className="TodaysHighlights">
                    <TodaysHighlights isCelsius={isCelsius} />
                  </div>
                  <div className="map">
                    <MyMap />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CoordContext.Provider>
      </>
    );
  }
}

export default App;
