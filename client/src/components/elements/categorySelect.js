// TODO: store and get catagories in config or database.
const catagories = [
	"Funny",
	"News",
	"Music",
	"Reactions",
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
	const options = catagories.map((o, i) => <option key={i}>{o}</option>);
	return (
		<select
			multiple={false}
			class="input-group-field"
			value={value}
			onChange={handleChange}
		>
			{options}
		</select>
	);
}
