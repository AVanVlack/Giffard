import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// User login and signup page
function Login() {
	const location = useLocation();
	console.log(location);
	const [tab, setTab] = useState();
	const [formValues, setFormValues] = useState({
		username: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});
	const { registerUser, loginUser, error } = useAuth();

	useEffect(() => {
		location.hash === "#login" ? setTab("login") : setTab("signup");
	}, []);

	// Handle submit of user signup
	const handleRegister = async (e) => {
		e.preventDefault();
		await registerUser(formValues);
	};

	// Handle submit of user login
	const handleLogin = async (e) => {
		e.preventDefault();
		await loginUser(formValues);
	};

	// Handle input changes
	// TODO: Create hook for forms
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	// TODO: Form Verification
	// TODO: Check passwords match
	return (
		<div id="LoginComponent">
			<div class="row column gif-details" id="signup-box">
				<ul class="tabs" id="control-details">
					<li className={"tabs-title"}>
						<a
							onClick={() => setTab("signup")}
							aria-selected={tab === "signup"}
						>
							SIGNUP
						</a>
					</li>
					<li className={"tabs-title"}>
						<a onClick={() => setTab("login")} aria-selected={tab === "login"}>
							LOGIN
						</a>
					</li>
				</ul>
				<div class="tabs-content">
					<div
						className={`tabs-panel ${tab === "signup" ? "is-active" : ""}`}
						id="signup-tab"
					>
						<h3>Find and Share Animations</h3>
						<p>
							Create an account to upload and create collections of your
							favorite animations
						</p>
						<div class="input-group">
							<div class="column small-12 medium-12">
								<form onSubmit={handleRegister}>
									<label>
										Username:
										<input
											class="input-group-field"
											type="text"
											placeholder="Username"
											value={formValues.username}
											onChange={handleChange}
											name="username"
										/>
									</label>
									<label>
										Email:
										<input
											type="email"
											class="input-group-field"
											placeholder="Email"
											value={formValues.email}
											onChange={handleChange}
											name="email"
										/>
									</label>
									<label>
										Password:
										<input
											type="password"
											class="input-group-field"
											placeholder="Password"
											value={formValues.password}
											onChange={handleChange}
											name="password"
										/>
									</label>
									<label>
										Confirm Password:
										<input
											type="password"
											class="input-group-field"
											placeholder="Confirm Password"
											value={formValues.passwordConfirm}
											onChange={handleChange}
											name="passwordConfirm"
										/>
									</label>
									<div id="submit-button-signup">
										<button type="submit" class="button" value="Submit">
											Sign-up
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div
						className={`tabs-panel ${tab === "login" ? "is-active" : ""}`}
						id="login-tab"
					>
						<div class="input-group">
							<div class="column small-12 medium-12">
								<h3>Login to Giffard</h3>
								<p>Please login to access all Giffard features</p>
								<form onSubmit={handleLogin}>
									<label>
										Username:
										<input
											class="input-group-field"
											type="text"
											placeholder="Username"
											value={formValues.username}
											onChange={handleChange}
											name="username"
										/>
									</label>
									<label>
										Password:
										<input
											class="input-group-field"
											type="password"
											placeholder="Password"
											value={formValues.password}
											onChange={handleChange}
											name="password"
										/>
									</label>
									<div id="submit-button-login">
										<button type="submit" value="Submit" class="button">
											Login
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
