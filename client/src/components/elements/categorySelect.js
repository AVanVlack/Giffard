// TODO: store and get catagories in config or database.
const catagories = [
	"Funny",
	"News",
	"Music",
	"Reaction",
	"Animals",
	"Emotions",
	"Actions",
	"Art",
	"TV/Media",
	"Memes",
	"Politics",
	"Games",
];

export default function CategorySelect({ value, setValue }) {
	const handleChange = (e) => {
		setValue(e.target.value);
	};
	const options = catagories.map((o) => <option>{o}</option>);
	return (
		<select class="input-group-field" value={value} onChange={handleChange}>
			{options}
		</select>
	);
}
