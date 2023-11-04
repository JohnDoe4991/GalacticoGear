import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar/SearchBar';
import ResultsList from '../SearchBar/ResultsList';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const [results, setResults] = useState([]);
	const [isResultsOpen, setIsResultsOpen] = useState(false);
	const resultsContainerRef = useRef(null);

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
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			<SearchBar setResults={setResults} setIsResultsOpen={setIsResultsOpen} />
			<div ref={resultsContainerRef}>
				{isResultsOpen && <ResultsList results={results} clearSearch={clearSearch} />}
			</div>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
