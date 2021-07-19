import { useState, useEffect } from "react";
import GifPreview from "./elements/gifPreview";
import { useParams } from "react-router-dom";

function Profile() {
	const [tab, setTab] = useState(1);
	const [profile, setProfile] = useState({
		image: "",
		name: "",
		username: "",
		bio: "",
		website: "",
	});
	const [created, setCreated] = useState([]);
	let { id } = useParams();

	useEffect(() => {
		const options = {
			method: "GET",
			headers: {
				Accept: "application/json",
				credentials: "include",
			},
		};
		// setPageStatus("loading");
		fetch(`/api/users/profile/${id}`, options)
			.then((r) => r.json())
			.then(async (data) => {
				console.log(data);
				setProfile({ ...profile, ...data });
				//setPageStatus("resolved");
			})
			.catch((err) => {
				console.log(err);
				//return setError(err.response.data);
			});
		fetch(`/api/gifs/new?user=${id}`, options)
			.then((r) => r.json())
			.then(async (data) => {
				console.log(data);
				setCreated(data);
				//setPageStatus("resolved");
			})
			.catch((err) => {
				console.log(err);
				//return setError(err.response.data);
			});
	}, []);

	// Map data to gif component
	let createdGifs = created.map((g) => (
		<GifPreview url={g.previewUrl} tags={g.tags} title={g.title} id={g._id} />
	));

	return (
		<div className="profile">
			<div className="row column profile-intro">
				<div className="column medium-4 photo">
					<img alt="user" src={profile.image} />
				</div>
				<div className="column medium-8 stats">
					<h2>{profile.name}</h2>
					<p>@{profile.username}</p>
					<p>{profile.bio}</p>
					<a href={profile.website}>{profile.website}</a>
					{/* <ul>
						<li>
							<i className="fa fa-arrow-up"> 5</i>
						</li>
						<li>
							<i className="fa fa-star"> 32</i>
						</li>
					</ul> */}
				</div>
			</div>
			<div className="row gif-details">
				<ul className="tabs" id="control-details" data-tabs="data-tabs">
					<li className="tabs-title is-active">
						<a onClick={() => setTab(1)} aria-selected={tab === 1}>
							UPLOADS
						</a>
					</li>
					<li className="tabs-title">
						<a onClick={() => setTab(2)} aria-selected={tab === 2}>
							STARED
						</a>
					</li>
				</ul>
				<div className="tabs-content">
					<div
						className={`tabs-panel ${tab === 1 ? "is-active" : ""}`}
						id="signup-tab"
					>
						<div className="row small-up-2 medium-up-3 large-up-4 gallary">
							{createdGifs}
						</div>
					</div>
					<div
						className={`tabs-panel ${tab === 2 ? "is-active" : ""}`}
						id="signup-tab"
					>
						<div className="row small-up-2 medium-up-3 large-up-4 gallary">
							{createdGifs}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
