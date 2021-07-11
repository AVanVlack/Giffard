import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import useAuth from "../hooks/useAuth";

function Navbar() {
	const [menuState, setMenuState] = useState(false);
	const { user } = useContext(UserContext);
	const { logoutUser } = useAuth();

	const toggleMenu = (e) => {
		setMenuState(!menuState);
	};

	const handleLogout = () => {
		logoutUser();
	};

	return (
		<div className="NavComponent">
			<column class="menu">
				<div class="top-bar">
					<div class="responsive-menu row">
						<div class="top-bar-left">
							<ul class="dropdown menu">
								<li class="menu-text logo">GIFFARD</li>
								<li>
									<Link to="/">
										<span class="current-location">MAIN</span>
									</Link>
								</li>
								<li>
									<Link to="/categories">
										<span>CATEGORIES</span>
									</Link>
								</li>
							</ul>
						</div>
						<div class="top-bar-right">
							<ul class="menu">
								<li id="search-icon">
									<a>
										<i class="fa fa-search fa-lg"></i>
									</a>
								</li>
								<li class="user" onClick={toggleMenu}>
									<a>
										{user && user.image ? (
											<img src={user.image} alt="user" />
										) : (
											<i class="fa fa-user fa-lg"></i>
										)}
									</a>
									{menuState && (
										<div class="float-left" id="user-actions">
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
			<div class="column search">
				<div class="input-group row">
					<input
						class="input-group-field"
						type="text"
						placeholder="Search Tags"
					/>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
