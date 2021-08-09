import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";

// User login and signup page
function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();
	const {
		register: loginRegister,
		handleSubmit: loginHandleSubmit,
		formState: { errors: loginErrors },
	} = useForm();
	const password = useRef({});
	password.current = watch("password", "");
	const location = useLocation();
	const [tab, setTab] = useState();
	const { registerUser, loginUser, error } = useAuth();

	useEffect(() => {
		location.hash === "#login" ? setTab("login") : setTab("signup");
	}, []);

	// Handle submit of user signup
	const onRegister = async (data) => {
		await registerUser(data);
	};

	// Handle submit of user login
	const onLogin = async (data) => {
		let loginData = {
			username: data.loginUsername,
			password: data.loginPassword,
		};
		await loginUser(loginData);
	};

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
								<form onSubmit={handleSubmit(onRegister)}>
									<label>
										Username:
										<input
											class="input-group-field"
											type="text"
											placeholder="Username"
											{...register("username", {
												required: "Username is required",
												maxLength: {
													value: 128,
													message: "Max username length is 128",
												},
											})}
										/>
										<div className="invalid-feedback">
											{errors.username?.message}
										</div>
									</label>
									<label>
										Email:
										<input
											type="email"
											class="input-group-field"
											placeholder="Email"
											{...register("email", {
												required: "Email is required",
												maxLength: {
													value: 320,
													message: "Max email length is 320",
												},
											})}
										/>
										<div className="invalid-feedback">
											{errors.email?.message}
										</div>
									</label>
									<label>
										Password:
										<input
											type="password"
											class="input-group-field"
											placeholder="Password"
											{...register("password", {
												required: "Password is required",
												maxLength: {
													value: 128,
													message: "Max password length is 128",
												},
												minLength: {
													value: 5,
													message: "Minimum password length is 5",
												},
											})}
										/>
										<div className="invalid-feedback">
											{errors.password?.message}
										</div>
									</label>
									<label>
										Confirm Password:
										<input
											type="password"
											class="input-group-field"
											placeholder="Confirm Password"
											{...register("confirmPassword", {
												required: "Please confirm password",
												maxLength: {
													value: 128,
													message: "Max password length is 128",
												},
												minLength: {
													value: 5,
													message: "Minimum password length is 5",
												},
												validate: (value) =>
													value === password.current ||
													"The passwords do not match",
											})}
										/>
										<div className="invalid-feedback">
											{errors.confirmPassword?.message}
										</div>
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
								<form onSubmit={loginHandleSubmit(onLogin)}>
									<label>
										Username:
										<input
											class="input-group-field"
											type="text"
											placeholder="Username"
											{...loginRegister("loginUsername", {
												required: "Username is required",
												maxLength: {
													value: 128,
													message: "Max username length is 128",
												},
											})}
										/>
										<div className="invalid-feedback">
											{loginErrors.username?.message}
										</div>
									</label>
									<label>
										Password:
										<input
											class="input-group-field"
											type="password"
											placeholder="Password"
											{...loginRegister("loginPassword", {
												required: "Password is required",
												maxLength: {
													value: 128,
													message: "Max password length is 128",
												},
												minLength: {
													value: 5,
													message: "Minimum password length is 5",
												},
											})}
										/>
										<div className="invalid-feedback">
											{loginErrors.password?.message}
										</div>
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
