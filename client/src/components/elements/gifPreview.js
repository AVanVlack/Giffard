// Preview of gif for displaying in list
export default function GifPreview(props) {
	return (
		<div className="column">
			<a href={`/gif/${props.id}`}>
				<div class="giffard">
					<img src={props.url} alt={props.title} />
					<p>{props.tags}</p>
				</div>
			</a>
		</div>
	);
}
