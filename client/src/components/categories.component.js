import React from "react";

const categories = [
	{
		image: "https://media.giphy.com/media/fVfnOJ0oLb87m/giphy.gif",
		category: "Memes",
	},
	{
		image: "https://media.giphy.com/media/CBl5I5d0YFUsw/giphy.gif",
		category: "Reactions",
	},
	{
		image: "https://media.giphy.com/media/l41lXwNetL7oWLrd6/giphy.gif",
		category: "Actions",
	},
	{
		image: "https://media.giphy.com/media/13S2y4dF6TPxHW/giphy.gif",
		category: "TV/Media",
	},
	{
		image: "https://media.giphy.com/media/13S2y4dF6TPxHW/giphy.gif",
		category: "Music",
	},
	{
		image: "https://media.giphy.com/media/YgmczzYWY4DTO/giphy.gif",
		category: "Art",
	},
	{
		image: "https://media.giphy.com/media/xT1XGS8p8GZ0RqN7J6/giphy.gif",
		category: "Animals",
	},
	{
		image: "https://media.giphy.com/media/w0CJXS2M44xfW/giphy.gif",
		category: "Funny",
	},
	{
		image: "https://media.giphy.com/media/oje6kPRIef6Gk/giphy.gif",
		category: "Politics",
	},
	{
		image: "https://media.giphy.com/media/3o85xxC61hRrRivlss/giphy.gif",
		category: "Games",
	},
	{
		image: "https://media1.giphy.com/media/zWAjH2KDDqI3G8Wucw/giphy.webp",
		category: "News",
	},
	{
		image:
			"https://media2.giphy.com/media/7SF5scGB2AFrgsXP63/200w.webp?cid=ecf05e47b6p85s7q0mlnqq939njf6nylb256nj4llqj9crx8&rid=200w.webp&ct=g",
		category: "Emotions",
	},
];

function Category(props) {
	return (
		<div class="column">
			<a href={`/category/${props.cat}`}>
				<div class="cat-item">
					<img src={props.image} alt={`Preview of ${props.cat}`} />
					<h3>{props.cat}</h3>
				</div>
			</a>
		</div>
	);
}

function Categories() {
	const list = categories.map((c) => (
		<Category image={c.image} cat={c.category} />
	));
	return (
		<div className="categoriesComponent">
			<div class="row small-up-1 medium-up-2 large-up-3 categories">{list}</div>
		</div>
	);
}

export default Categories;
