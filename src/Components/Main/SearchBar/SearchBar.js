import './SearchBar.css';
import React from 'react';
import { useState, useContext, useCallback } from 'react';
import search from '../../icons/search.png';
import { useSelector, useDispatch } from 'react-redux';
// import Modal from 'react-modal';
import { loadCoord } from '../../../redux/Slice/SearchSlice/searchApiHandlers';
import { loadWeather } from '../../../redux/Slice/WeatherSlice/weatherApiHandlers';
import { CoordContext } from './CoordContext';
import { debounce } from '../../../utils/debounce';

const SearchBar = () => {
  // Getting data from Context
  let { coordsContext, setCoordsContext } = useContext(CoordContext);

  // Working with redux store
  const { coordFromAPI } = useSelector((state) => state.search);

  const dispatch = useDispatch();

  const sendCoords = (index) => {
    const coords = {
      lat: coordFromAPI?.allCities[index].lat,
      lon: coordFromAPI?.allCities[index].lon,
    };
    dispatch(
      loadWeather({
        coord: coords,
      })
    );
    setCoordsContext((coordsContext = coords));
  };

  // Debounce Search

  const [searchText, setSearchText] = useState('');
  const handleChange = (value) => {
    if (value) dispatch(loadCoord(value));
  };

  const debounceSearch = useCallback(
    debounce((value) => {
      handleChange(value);
    }),
    []
  );

  //Rendering Buttons

  const citiesList = () => {
    return coordFromAPI?.allCities.map((city, index) => (
      <div className="citiesList" key={index}>
        <button onClick={() => sendCoords(index)}>
          <p>
            {city.name}, {city.country}, {city.state}
          </p>
        </button>
      </div>
    ));
  };

  return (
    <>
      <div className="searchBar">
        <img className="searchImg" src={search} alt="Search Icon" />

        <input
          type="text"
          className="searchBarInput"
          placeholder="search for places..."
          value={searchText}
          onChange={(event) => {
            debounceSearch(event.target.value);
            setSearchText(event.target.value);
          }}
        />

        {searchText && <div className="dropDown">{citiesList()}</div>}
      </div>
    </>
  );
};

export default SearchBar;
