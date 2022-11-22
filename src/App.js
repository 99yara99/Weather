import './App.css';
import React from 'react';
import Main from './Components/Main/Main';
import Loading from './Components/Loading';
import TodaysHighlights from './Components/TodaysHighlights';
import ForecastWeek from './Components/ForecastWeek';
import MyMap from './Components/Map';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadWeather } from './redux/slice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWeather());
  }, [dispatch]);

  const { isLoading, error } = useSelector((state) => state.weather);

  const renderError = () => {
    if (!error) return null;
    return <h2>Error occured: {error}</h2>;
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="all">
          {renderError()}

          <div className="Main">
            <Main />
          </div>

          <div className="double">
            <div className="ForecastWeek">
              <ForecastWeek />
            </div>
            <div className="down">
              <div className="TodaysHighlights">
                <TodaysHighlights />
              </div>
              <div className="leaflet-container">
                <MyMap />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
