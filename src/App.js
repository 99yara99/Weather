import './App.css';
import React from 'react';
import Main from './Components/Main';
import Loading from './Components/Loading';
import TodaysHighlights from './Components/TodaysHighlights';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadWeather } from './redux/slice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadWeather());
  }, [dispatch]);

  const { isLoading, error } = useSelector((state) => state.weather);
  // console.log(`isLoading: ${isLoading}, error: ${error}`);

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
          {/* {JSON.stringify(weatherFromAPI)} */}

          <div className="Main">
            <Main />
          </div>

          <div className="double">
            <div className="up"></div>
            <div className="down">
              <div className="TodaysHighlights">
                <TodaysHighlights />
              </div>
              <div className="Map"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
