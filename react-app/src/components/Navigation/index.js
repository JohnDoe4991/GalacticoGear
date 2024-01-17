import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar/SearchBar';
import ResultsList from '../SearchBar/ResultsList';
import galacticoGear from "../../images/galacticoGear.png"
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import Tooltip from "./tooltip"

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const [results, setResults] = useState([]);
	const [isResultsOpen, setIsResultsOpen] = useState(false);
	const resultsContainerRef = useRef(null);
	const [showMenu, setShowMenu] = useState(false);

	const clearSearch = () => {
		setResults([]);
		setIsResultsOpen(false);
	};


	const handleOutsideClick = (event) => {
		if (resultsContainerRef.current && !resultsContainerRef.current.contains(event.target)) {
			clearSearch();
		}
	};

	useEffect(() => {

		document.addEventListener('click', handleOutsideClick);


		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, []);

	return (
		<div className="nav-container">
			<div className='navBar-inner-container'>
				<div >
					<NavLink exact to="/"><img className='logo-img' src={galacticoGear} alt="logo" id="logo" /></NavLink>
				</div>
				{sessionUser && (
					<SearchBar setResults={setResults} setIsResultsOpen={setIsResultsOpen} />
				)}
				{!sessionUser && (
					<h3 className='nav-h3'>!HalaMadrid!</h3>
				)}
				{isLoaded && (
					<div className="profile-button-container">
						<ProfileButton user={sessionUser} showMenu={showMenu} />
						<Tooltip text="Cart" className='cart-icon'>
							<a href='/carts' className='cart-icon'><AiOutlineShoppingCart /></a>
						</Tooltip>
						<Tooltip text="Favorites" className='fav-icon'>
							<a href='/favorites' className='fav-icon'><MdFavoriteBorder /></a>
						</Tooltip>
					</div>
				)}
			</div>
			<div className='results-container' ref={resultsContainerRef}>
				{isResultsOpen && <ResultsList results={results} clearSearch={clearSearch} />}
			</div>
		</div>
	);
}

export default Navigation;
