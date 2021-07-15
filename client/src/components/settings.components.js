import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import UserSettingForm from "./elements/userSettingForm";

function Settings() {
	const [pageState, setPageState] = useState("loading");
	const [profileData, setProfileData] = useState({});

	useEffect(() => {
		const options = {
			method: "GET",
			credentials: "include",
			headers: {
				Accept: "application/json",
			},
		};
		fetch(`/api/users/profile/me`, options)
			.then((r) => {
				if (r.status === 200) {
					return r.json();
				} else {
					// TODO: Display error on page
					console.log(r.status);
				}
			})
			.then((profile) => {
				setProfileData(profile);
				setPageState("resolved");
				console.log(profile);
			})
			.catch((err) => {
				// TODO: Make error handler
				console.log(err);
			});
	}, []);

	return (
		<div className="App">
			{pageState === "resolved" && <UserSettingForm data={profileData} />}
			{pageState === "loading" && (
				<div id="loading-spinner">
					<i class="fa fa-spinner fa-pulse fa-3x fa-fw "></i>
				</div>
			)}
		</div>
	);
}

export default Settings;
