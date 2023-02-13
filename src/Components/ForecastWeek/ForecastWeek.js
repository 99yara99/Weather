import './ForecastWeek.css';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import clearSky from '../icons/clearSky01d.png';
import fewCloudsScatteredClouds from '../icons/fewCloudsScatteredClouds02d.png';
import overcastCloudsBrokenClouds from '../icons/overcastCloudsBrokenClouds04d.png';
import showerRain from '../icons/showerRain09d.png';
import rain from '../icons/rain10d.png';
import thunderstorm from '../icons/thunderstorm11d.png';
import snow from '../icons/snow13d.png';
import mist from '../icons/mist50d.png';

const ForecastWeek = ({ isCelsius }) => {
  // Getting API response from redux store
  const { weatherFromAPI } = useSelector((state) => state.weather);

  // Rendering Divs

  const renderImage = (elem) => {
    switch (true) {
      case ['01d', '01n'].includes(elem.weather[0].icon):
        return <img src={clearSky} alt="Clear Sky" />;
      case ['02d', '02n', '03d', '03n'].includes(elem.weather[0].icon):
        return (
          <img
            src={fewCloudsScatteredClouds}
            alt="Few Clouds or Scattered Clouds"
          />
        );
      case ['04d', '04n'].includes(elem.weather[0].icon):
        return (
          <img
            src={overcastCloudsBrokenClouds}
            alt="Overcast Clouds or Broken Clouds"
          />
        );
      case ['09d', '09n'].includes(elem.weather[0].icon):
        return <img src={showerRain} alt="Shower Rain" />;
      case ['10d', '10n'].includes(elem.weather[0].icon):
        return <img src={rain} alt="Rain" />;
      case ['13d', '13n'].includes(elem.weather[0].icon):
        return <img src={snow} alt="Snow" />;
      case ['50d', '50n'].includes(elem.weather[0].icon):
        return <img src={thunderstorm} alt="Thunderstorm" />;
      default:
        return <img src={mist} alt="Mist" />;
    }
  };
  const forecastDivs = () => {
    return weatherFromAPI?.forecastWeather.list.map((elem, index) => (
      <div key={index} className="forecastDiv">
        <p>{`${moment.unix(elem.dt).format('HH:mm')}`}</p>
        <div className="imageIcon">{renderImage(elem)}</div>
        <div className="forecastTempText">
          {isCelsius === 'metric' ? (
            <div>
              <p>{`${Math.round(elem.main.temp_min)}°`}</p>
              <p>{`${Math.round(elem.main.temp_max)}°`}</p>
            </div>
          ) : (
            <div>
              <p>{`${Math.round(elem.main.temp_min * 1.8 + 32)}°`}</p>
              <p>{`${Math.round(elem.main.temp_max * 1.8 + 32)}°`}</p>
            </div>
          )}
        </div>
      </div>
    ));
  };

  return <>{forecastDivs()}</>;
};

export default ForecastWeek;
