import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";

// User login and signup page
function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
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
		await loginUser(data);
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
													message: "Min password length is 5",
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
												required: "Password confirm is required",
												maxLength: {
													value: 128,
													message: "Max password length is 128",
												},
												minLength: {
													value: 5,
													message: "Min password length is 5",
												},
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
								<form onSubmit={handleSubmit(onLogin)}>
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
										Password:
										<input
											class="input-group-field"
											type="password"
											placeholder="Password"
											{...register("password", {
												required: "Password is required",
												maxLength: {
													value: 128,
													message: "Max password length is 128",
												},
												minLength: {
													value: 5,
													message: "Min password length is 5",
												},
											})}
										/>
										<div className="invalid-feedback">
											{errors.password?.message}
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
