import React from "react";

function Settings() {
	return (
		<div className="App">
			<div class="row window" id="settings">
				<div class="column small-12 medium-4 medium-push-8" id="settings-image">
					<img
						src="http://gravatar.com/avatar/9e6cb7c90ee951ac7f6280cbad6876a6?s=200"
						id="profile-image-preview"
					/>
					<fieldset id="image-source">
						<legend>Image source</legend>
						<div class="group">
							<input
								type="radio"
								name="image-source"
								value="gravatar"
								checked="checked"
								id="gravatar-radio"
							/>
							<label for="gravatar-radio">Gravatar</label>
						</div>
						<div class="group">
							<input
								type="radio"
								name="image-source"
								value="upload"
								id="upload-radio"
							/>
							<label for="upload-radio">Upload</label>
							<label class="button" for="img-upload" id="img-upload-button">
								{" "}
								<i class="fa fa-upload"> </i> Upload
							</label>
							<input type="file" id="img-upload" />
						</div>
					</fieldset>
				</div>
				<div class="column small-12 medium-8 medium-pull-4" id="settings-info">
					<div class="input-group">
						<span class="input-group-label">Name</span>
						<input
							class="input-group-field"
							type="text"
							value="Andrew VanVlack"
						/>
					</div>
					<div class="input-group">
						<span class="input-group-label">Bio</span>
						<textarea class="input-group-field"></textarea>
					</div>
					<div class="input-group">
						<span class="input-group-label">Website</span>
						<input class="input-group-field" type="text" value="https://" />
					</div>
					<div class="input-group">
						<span class="input-group-label">URL</span>
						<label class="input-group-label data-label" for="url-input">
							giffard.com/u/
						</label>
						<input
							class="input-group-field"
							type="text"
							value="vanvlack"
							id="url-input"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
