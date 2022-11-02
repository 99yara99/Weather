import './App.css';
import React from 'react';
import Main from './Components/Main';
import Loading from './Components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadWeather } from './redux/slice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadWeather());
  }, []);
  const { weatherFromStore, isLoading, error } = useSelector(
    (state) => state.weather
  );
  console.log(weatherFromStore, isLoading);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="all">
          {error && <h2>Error occured: {error}</h2>}

          <div className="left">
            <Main weatherFromStore={weatherFromStore} />
          </div>

          <div className="double">
            <div className="up"></div>
            <div className="down"></div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
