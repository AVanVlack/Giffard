import React, { useState, useEffect } from "react";
import GifPreview from "./elements/gifPreview";

// mock gifs for testing
const mockData = [
	{
		id: 3392944459,
		tiltle: "Parks",
		tags: "#Whatever #Parks & Rec",
		url: "https://f000.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_zb8a7a66dc5bf059f7eab0d19_f118eeb83e772bb84_d20210618_m153409_c000_v0001158_t0018",
	},
	{
		id: 3392944459,
		tiltle: "Cooooool",
		tags: "#Cross Arms #Whatever",
		url: "https://f000.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_zb8a7a66dc5bf059f7eab0d19_f109748d68108d395_d20210618_m153440_c000_v0001076_t0036",
	},
	{
		id: 3392944459,
		tiltle: "This World",
		tags: "#Westworld #Delorus",
		url: "https://f000.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_zb8a7a66dc5bf059f7eab0d19_f11122f0df78817dc_d20210618_m153309_c000_v0001061_t0029",
	},
	{
		id: 3392944459,
		tiltle: "Nice One",
		tags: "#Cowboy #Little Dance",
		url: "https://f000.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_zb8a7a66dc5bf059f7eab0d19_f116d86e4de621ef6_d20210618_m153346_c000_v0001060_t0020",
	},
	{
		id: 3392944459,
		tiltle: "Sleep Time",
		tags: "#Cute cat #Sleepy",
		url: "https://f000.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_zb8a7a66dc5bf059f7eab0d19_f112b201b6c7c2c62_d20210618_m153145_c000_v0001059_t0043",
	},
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

function Main() {
	const [gifList, setGifList] = useState(mockData);

	// Grab list of gifs
	useEffect(() => {
		const url = "api/gifs/new";
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				//setGifList(res);
			});
	}, []);

	// Map data to gif component
	let gifs = gifList.map((g) => (
		<GifPreview url={g.url} tags={g.tags} title={g.title} id={g.id} />
	));

	return (
		<div className="MainComponent">
			<div class="row small-up-2 medium-up-3 large-up-4 gallary">{gifs}</div>
		</div>
	);
}

export default Main;
