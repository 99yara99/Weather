import './SearchBar.css';
import React from 'react';
import { useState, useContext } from 'react';
import search from '../../icons/search.png';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { loadCoord } from '../../../redux/Slice/searchSlice';
import { loadWeather } from '../../../redux/Slice/weathersSlice';
import { CoordContext } from './CoordContext';

const SearchBar = () => {
  // Modal State
  const [modalIsOpen, setIsOpen] = useState(false);

  // Input State
  const [searchText, setSearchText] = useState('');
  const handleChange = (event) => {
    event.preventDefault();
    setSearchText(event.target.value);
  };

  // Getting API response from redux store
  const { coordFromAPI } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  // Getting data from Context
  let { coordsContext, setCoordsContext } = useContext(CoordContext);

  // Modal functions
  let openModal = () => {
    dispatch(loadCoord(searchText));
    setIsOpen(true);
  };
  let closeModal = () => setIsOpen(false);

  //Rendering Buttons

  let citiesList = coordFromAPI?.allCities.map((city, index) => (
    <div className="citiesList" key={index}>
      <button
        onClick={() => {
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
          closeModal();
        }}
      >
        <p>
          {city.name}, {city.country}, {city.state}
        </p>
      </button>
    </div>
  ));

  return (
    <>
      <div className="searchBar">
        <button onClick={() => openModal()}>
          <img src={search} alt="Search Icon" />
        </button>

        <input
          type="text"
          placeholder="search for places..."
          value={searchText}
          onChange={handleChange}
          onSubmit={() => openModal()} // ? not working
        />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          className="modalWindow"
        >
          <div>{citiesList}</div>
        </Modal>
      </div>
    </>
  );
};

export default SearchBar;
