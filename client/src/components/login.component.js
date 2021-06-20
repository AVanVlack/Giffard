import React, { useState } from "react";

function Login() {
	const [tab, setTab] = useState(1);

	return (
		<div id="LoginComponent">
			<div class="row column gif-details" id="signup-box">
				<ul class="tabs" id="control-details">
					<li className={"tabs-title"}>
						<a onClick={() => setTab(1)} aria-selected={tab === 1}>
							SIGNUP
						</a>
					</li>
					<li className={"tabs-title"}>
						<a onClick={() => setTab(2)} aria-selected={tab === 2}>
							LOGIN
						</a>
					</li>
				</ul>
				<div class="tabs-content">
					<div
						className={`tabs-panel ${tab === 1 ? "is-active" : ""}`}
						id="signup-tab"
					>
						<h3>Share and Save Animations</h3>
						<p>
							Create an account to upload and create collections for your
							favorite animations
						</p>
						<div class="input-group">
							<div class="column small-12 medium-12">
								<label>
									Username:
									<input
										class="input-group-field"
										type="text"
										placeholder="Username"
									/>
								</label>
								<label>
									Email:
									<input
										type="email"
										class="input-group-field"
										placeholder="Email"
									/>
								</label>
								<label>
									Password:
									<input
										type="password"
										class="input-group-field"
										placeholder="Password"
									/>
								</label>
								<label>
									Confirm Password:
									<input
										type="password"
										class="input-group-field"
										placeholder="Confirm Password"
									/>
								</label>
								<div id="submit-button-signup">
									<button type="button" class="button">
										Sign-up
									</button>
								</div>
							</div>
						</div>
					</div>
					<div
						className={`tabs-panel ${tab === 2 ? "is-active" : ""}`}
						id="login-tab"
					>
						<div class="input-group">
							<div class="column small-12 medium-12">
								<h3>Login to Giffard</h3>
								<p>Please login to access all Giffard features</p>
								<label>
									Username:
									<input
										class="input-group-field"
										type="text"
										placeholder="Username"
									/>
								</label>
								<label>
									Password:
									<input
										class="input-group-field"
										type="password"
										placeholder="Password"
									/>
								</label>
								<div id="submit-button-login">
									<button type="button" class="button">
										Login
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
