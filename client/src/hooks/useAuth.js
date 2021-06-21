import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "./UserContext";

//TODO: Convert to fetch

export default function useAuth() {
	let history = useHistory();
	const { setUser } = useContext(UserContext);
	const [error, setError] = useState(null);

	// Set user context for global use
	const setUserContext = async (data) => {
		const options = {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};
		return await fetch(`/api/users`, options)
			.then((r) => r.json())
			.then(async (data) => {
				setUser(data.currentUser);
				history.push("/home");
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
				//return setError(err.response.data);
			});
	};

	// Register user; get cookied
	const registerUser = async (data) => {
		const { username, email, password, passwordConfirm } = data;
		const options = {
			method: "POST",
			body: JSON.stringify({ username, email, password, passwordConfirm }),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};
		return fetch(`/api/users/register`, options)
			.then(async (r) => {
				await setUserContext();
				console.log(r);
			})
			.catch((err) => {
				console.log(err);
				//return setError(err.response.data);
			});
	};
	// TODO: Change login to auth route on server
	// Login user; get cookied
	const loginUser = async (data) => {
		const { username, password } = data;
		const options = {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};
		return fetch(`/api/users/login`, options)
			.then(async (r) => {
				await setUserContext();
				console.log(r);
			})
			.catch((err) => {
				console.log(err);
				//return setError(err);
			});
	};

	return {
		registerUser,
		loginUser,
		error,
	};
}
