import './SearchBar.css';
import React from 'react';
import { useState, useContext, useCallback } from 'react';
import search from '../../icons/search.png';
import { useSelector, useDispatch } from 'react-redux';
// import Modal from 'react-modal';
import { loadCoord } from '../../../redux/Slice/searchSlice';
import { loadWeather } from '../../../redux/Slice/weathersSlice';
import { CoordContext } from './CoordContext';

const SearchBar = () => {
  // Modal State
  // const [modalIsOpen, setIsOpen] = useState(false);

  // Getting data from Context
  let { coordsContext, setCoordsContext } = useContext(CoordContext);

  // Working with redux store
  const { coordFromAPI } = useSelector((state) => state.search);

  const dispatch = useDispatch();
  const sendCoords = (index) => {
    dispatch(
      loadWeather({
        coord: {
          lat: coordFromAPI?.allCities[index].lat,
          lon: coordFromAPI?.allCities[index].lon,
        },
      })
    );
    setCoordsContext(
      (coordsContext = {
        lat: coordFromAPI?.allCities[index].lat,
        lon: coordFromAPI?.allCities[index].lon,
      })
    );
  };

  // Debounce Search

  const debounce = (func) => {
    let timeout;
    return (...args) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func(...args);
      }, 500);
    };
  };

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
