import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar/SearchBar';
import ResultsList from '../SearchBar/ResultsList';


function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const [results, setResults] = useState([])

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			<SearchBar setResults={setResults} />
			<ResultsList results={results} />
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
