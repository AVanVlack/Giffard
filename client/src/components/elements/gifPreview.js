// Preview of gif for displaying in list
export default function GifPreview(props) {
	const tags = props.tags.map((t) => "#" + t);
	return (
		<div className="column">
			<a href={`/gif/${props.id}`}>
				<div class="giffard">
					<img src={props.url} alt={props.title} />
					<p>{tags.join(" ")}</p>
				</div>
			</a>
		</div>
	);
}
