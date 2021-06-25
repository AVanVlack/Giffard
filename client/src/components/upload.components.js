import React, { useState } from "react";
import Tags from "./elements/tags";

function Upload() {
	const [tags, setTags] = useState([]);

	return (
		<div className="App">
			<div class="row column window" id="upload-input">
				<div class="input-group">
					<input
						class="input-group-field"
						placeholder="Input URL or drop Gif here"
					/>
					<input id="file-input" type="file" />
					<div class="input-group-button">
						<label class="button" for="file-input">
							Browse
						</label>
					</div>
				</div>
			</div>
			<div
				class="row window"
				id="upload-details"
				ng-app="myApp"
				ng-controller="MyCtrl"
			>
				<div class="column small-12 medium-6">
					<div class="input-group">
						<span class="input-group-label">Title</span>
						<input class="input-group-field" type="text" />
					</div>
					<div class="input-group">
						<span class="input-group-label">Description</span>
						<textarea class="input-group-field"></textarea>
					</div>
				</div>
				<div class="column small-12 medium-6">
					<div class="input-group">
						<span class="input-group-label">Category</span>
						<select class="input-group-field">
							<option selected="true">Funny</option>
							<option>News</option>
							<option>Music</option>
							<option>Reaction </option>
							<option>Animals</option>
							<option>Emotions</option>
							<option>Actions </option>
							<option>Art</option>
							<option>TV/Media</option>
							<option>Memes</option>
							<option>Politics</option>
							<option>Games</option>
						</select>
					</div>
					<div class="input-group tag-edit">
						<span class="input-group-label">Tags</span>
						<div class="tag-group">
							<Tags tags={tags} setTags={setTags} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Upload;
