import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import GifPreview from "./elements/gifPreview";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function Main() {
	const [gifList, setGifList] = useState([]);
	let location = useLocation();
	const { cat } = useParams();
	let query = useQuery();

	// Grab list of gifs
	useEffect(() => {
		const search = query.get("search") || "";
		const categories = cat || "";
		const url = `/api/gifs/new/?categories=${categories}&search=${search}`;
		console.log(url);
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				setGifList(res);
			});
	}, [location]);

	// Map data to gif component
	let gifs = gifList.map((g) => (
		<GifPreview url={g.previewUrl} tags={g.tags} title={g.title} id={g._id} />
	));

	return (
		<div className="MainComponent">
			<div className="row small-up-2 medium-up-3 large-up-4 gallary">
				{gifs}
			</div>
		</div>
	);
}

export default Main;
