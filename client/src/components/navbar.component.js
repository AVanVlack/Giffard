import React, { useState, useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import useAuth from "../hooks/useAuth";

function Navbar() {
	const [menuState, setMenuState] = useState(false);
	const { user } = useContext(UserContext);
	const { logoutUser } = useAuth();
	const [search, setSearch] = useState("");
	let history = useHistory();

	const toggleMenu = (e) => {
		setMenuState(!menuState);
	};

	const handleLogout = () => {
		logoutUser();
	};

	const onChange = (e) => {
		setSearch(e.target.value);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		history.push(`/?search=${search}`);
	};

	return (
		<div className="NavComponent">
			<column className="menu">
				<div className="top-bar">
					<div className="responsive-menu row">
						<div className="top-bar-left">
							<ul className="dropdown menu">
								<li className="menu-text logo">GIFFARD</li>
								<li>
									<NavLink activeClassName="current-location" exact to="/">
										<span>NEW</span>
									</NavLink>
								</li>
								<li>
									<NavLink activeClassName="current-location" to="/categories">
										<span>CATEGORIES</span>
									</NavLink>
								</li>
							</ul>
						</div>
						<div className="top-bar-right">
							<ul className="menu">
								<li id="search-icon">
									<a>
										<i className="fa fa-search fa-lg"></i>
									</a>
								</li>
								<li className="user" onClick={toggleMenu}>
									<a>
										{user && user.image ? (
											<img src={user.image} alt="user" />
										) : (
											<i class="fa fa-user fa-lg"></i>
										)}
									</a>
									{menuState && (
										<div className="float-left" id="user-actions">
											{!user ? (
												<ul>
													<li>
														<Link to="/login">Login/Register</Link>
													</li>
												</ul>
											) : (
												<ul>
													<li>
														<Link to={`/user/${user._id}`}>My Profile</Link>
													</li>
													<li>
														<Link to="/upload">Add Gif</Link>
													</li>
													<li>
														<Link to="/settings">Settings</Link>
													</li>
													<li>
														<a onClick={handleLogout}>Logout</a>
													</li>
												</ul>
											)}
										</div>
									)}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</column>
			<div className="column search">
				<div className="input-group row">
					<form onSubmit={handleSearch}>
						<input
							className="input-group-field"
							type="text"
							placeholder="Search Tags"
							onChange={onChange}
							value={search}
						/>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
