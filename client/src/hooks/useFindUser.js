import { useState, useEffect } from "react";

export default function useFindUser() {
	const [user, setUser] = useState(null);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		async function findUser() {
			const options = {
				method: "GET",
				credentials: "include",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			};
			await fetch(`/api/users`, options)
				.then((r) => r.json())
				.then(async (data) => {
					setUser(data.currentUser);
					setLoading(false);
				})
				.catch((err) => {
					setLoading(false);
				});
		}

		findUser();
	}, []);

	return {
		user,
		setUser,
		isLoading,
	};
}
