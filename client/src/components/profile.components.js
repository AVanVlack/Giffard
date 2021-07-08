import { useState, useEffect } from "react";
import GifPreview from "./elements/gifPreview";

const mockData = [
	{
		id: 3392944459,
		tiltle: "Going to America",
		tags: "#Borat 2 #Trip",
		url: "https://media3.giphy.com/media/nuR5UvczUfmU7jsCLp/200w.webp?cid=ecf05e477pdgbjgfg6ea5po4o0q7iiyujwujo98pdw9pmyqu&rid=200w.webp&ct=g",
	},
	{
		id: 3392944459,
		tiltle: "Making the bed",
		tags: "#Curly Dog #Cuddle",
		url: "https://media3.giphy.com/media/TFdrOnLejlFXa/giphy.webp?cid=ecf05e471mv3h6wg7fyvf0fmi2r1uo2v2kjsu0qlar3ts225&rid=giphy.webp&ct=g",
	},
	{
		id: 3392944459,
		tiltle: "Finaly Friday",
		tags: "#Friday #Weekend",
		url: "https://media2.giphy.com/media/3o7btV1sSvBaaSAQKc/200w.webp?cid=ecf05e47f3066z78xxnjxlbndod36qg4zm6jdors1y9wr4aw&rid=200w.webp&ct=g",
	},
	{
		id: 3392944459,
		tiltle: "Party Time",
		tags: "#Party #Cool Dog",
		url: "https://media3.giphy.com/media/1mW3bDTf348H6/giphy.webp?cid=ecf05e47q3xjuu6b6v59zxgntglq3nvg7gtka654pt4rg4qa&rid=giphy.webp&ct=g",
	},
	{
		id: 3392944459,
		tiltle: "Birthday World",
		tags: "#Happy Birdday #Candles",
		url: "https://media1.giphy.com/media/2JQzHW4kxMGGs/giphy.webp?cid=ecf05e47quazsc6vupybgdi5aiz7qr3cxwnzw6a2bd380j2v&rid=giphy.webp&ct=g",
	},
	{
		id: 3392944459,
		tiltle: "Big Pot",
		tags: "#Coffee #Cafean",
		url: "https://media2.giphy.com/media/26ufhEUSE22cPmYiQ/200w.webp?cid=ecf05e47g8hk74iq5ro78cjdj7wrrobjf2351l77nazs9989&rid=200w.webp&ct=g",
	},
	{
		id: 3392944459,
		tiltle: "Missed You",
		tags: "#walking dead #negan",
		url: "https://media4.giphy.com/media/l0MYzEB9J8qPOnER2/200w.webp?cid=ecf05e47fw9jku9ebet4qpuva7kd9scmf5mlv0zh0feck1io&rid=200w.webp&ct=g",
	},
];

function Profile() {
	const [tab, setTab] = useState(1);
	const [profile, setProfile] = useState({
		image: "",
		name: "",
		username: "",
		bio: "",
		website: "",
	});
	const [created, setCreated] = useState(mockData);

	useEffect(() => {
		const options = {
			method: "GET",
			headers: {
				Accept: "application/json",
				credentials: "include",
			},
		};
		// setPageStatus("loading");
		fetch(`/api/users/profile/me`, options)
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
		fetch(`/api/gifs/new?user=60c4b4b69f04b4567e0fc521`, options)
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
			<div class="row column profile-intro">
				<div class="column medium-4 photo">
					<img src={profile.image} />
				</div>
				<div class="column medium-8 stats">
					<h2>{profile.name}</h2>
					<p>@{profile.username}</p>
					<p>{profile.bio}</p>
					<a href={profile.website}>{profile.website}</a>
					{/* <ul>
						<li>
							<i class="fa fa-arrow-up"> 5</i>
						</li>
						<li>
							<i class="fa fa-star"> 32</i>
						</li>
					</ul> */}
				</div>
			</div>
			<div class="row gif-details">
				<ul class="tabs" id="control-details" data-tabs="data-tabs">
					<li class="tabs-title is-active">
						<a onClick={() => setTab(1)} aria-selected={tab === 1}>
							UPLOADS
						</a>
					</li>
					<li class="tabs-title">
						<a onClick={() => setTab(2)} aria-selected={tab === 2}>
							STARED
						</a>
					</li>
				</ul>
				<div class="tabs-content">
					<div
						className={`tabs-panel ${tab === 1 ? "is-active" : ""}`}
						id="signup-tab"
					>
						<div class="row small-up-2 medium-up-3 large-up-4 gallary">
							{createdGifs}
						</div>
					</div>
					<div
						className={`tabs-panel ${tab === 2 ? "is-active" : ""}`}
						id="signup-tab"
					>
						<div class="row small-up-2 medium-up-3 large-up-4 gallary">
							{createdGifs}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
