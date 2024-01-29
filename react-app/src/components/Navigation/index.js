import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar/SearchBar';
import ResultsList from '../SearchBar/ResultsList';
import galacticoGear from "../../images/galacticoGear.png";
import { CiShoppingCart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

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
				<NavLink exact to="/">
					<img className='logo-img' src={galacticoGear} alt="logo" id="logo" />
				</NavLink>
				{sessionUser && (
					<SearchBar setResults={setResults} setIsResultsOpen={setIsResultsOpen} />
				)}
				{!sessionUser && (
					<h3 className='nav-h3'>!HalaMadrid!</h3>
				)}
				{isLoaded && (
					<div className="profile-button-container">
						<ProfileButton user={sessionUser} showMenu={showMenu} />
						{sessionUser && (<NavLink to='/carts' className='cart-icon' title="Cart">
							<CiShoppingCart />
						</NavLink>)}
						{sessionUser && (<NavLink to='/favorites' className='fav-icon' title="Favorites">
							<FaHeart />
						</NavLink>)}
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
