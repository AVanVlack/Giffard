import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GifPreview from "./elements/gifPreview";

function Main() {
	const [gifList, setGifList] = useState([]);
	const { cat } = useParams();

	// Grab list of gifs
	useEffect(() => {
		const url = cat ? `/api/gifs/new?categories=${cat}` : "/api/gifs/new";
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				setGifList(res);
			});
	}, [cat]);

	// Map data to gif component
	let gifs = gifList.map((g) => (
		<GifPreview url={g.previewUrl} tags={g.tags} title={g.title} id={g._id} />
	));

	return (
		<div className="MainComponent">
			<div class="row small-up-2 medium-up-3 large-up-4 gallary">{gifs}</div>
		</div>
	);
}

export default Main;
