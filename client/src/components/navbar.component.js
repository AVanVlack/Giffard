import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
	const [menuState, setMenuState] = useState(false);

	const toggleMenu = (e) => {
		setMenuState(!menuState);
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
										<img
											src="http://gravatar.com/avatar/9e6cb7c90ee951ac7f6280cbad6876a6"
											alt="imgage of the user"
										/>
									</a>
									{menuState && (
										<div class="float-left" id="user-actions">
											<ul>
												<li>
													<Link to="/user/me">My Profile</Link>
												</li>
												<li>
													<Link to="/upload">Add Gif</Link>
												</li>
												<li>
													<Link to="/settings">Settings</Link>
												</li>
												<li>
													<Link to="/login">Register/Login</Link>
												</li>
											</ul>
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
