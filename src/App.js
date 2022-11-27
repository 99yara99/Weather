import './App.css';
import React from 'react';
import Main from './Components/Main/Main';
import Loading from './Components/Loading';
import TodaysHighlights from './Components/TodaysHighlights/TodaysHighlights';
import ForecastWeek from './Components/ForecastWeek/ForecastWeek';
import MyMap from './Components/Map/Map';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadWeather } from './redux/slice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      loadWeather({
        coord: {
          lat: 50.4333,
          lon: 30.5167,
        },
        unitTemp: 'metric',
      })
    );
  }, [dispatch]);

  const { isLoading, error } = useSelector((state) => state.weather);

  const renderError = () => {
    if (!error) return null;
    return <h2>Error occured: {error}</h2>;
  };

  const [isCelsius, setIsCelsius] = useState('metric');

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
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
                  className="celsius"
                  type="submit"
                  onClick={() => setIsCelsius('metric')}
                >
                  °C
                </button>
                <button
                  className="celsius"
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
      </>
    );
  }
}

export default App;
