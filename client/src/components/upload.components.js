import React from "react";

function Upload() {
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
							<option>Funny</option>
							<option>Reaction - Scared </option>
							<option>Reaction - Cry</option>
							<option>Reaction </option>
							<option>Reaction</option>
							<option selected="true">Actions - Fail</option>
							<option>Actions </option>
							<option></option>
						</select>
					</div>
					<div class="input-group tag-edit">
						<span class="input-group-label">Tags</span>
						<div class="tag-group">
							<tags-input ng-model="tags"></tags-input>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Upload;
