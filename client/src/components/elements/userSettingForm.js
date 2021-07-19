import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

function UserSettingsForm(props) {
	const { register, handleSubmit } = useForm({
		defaultValues: props.data,
	});
	const history = useHistory();

	const onSubmit = (data) => {
		const options = {
			body: JSON.stringify(data),
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};
		fetch(`/api/users/updateProfile`, options)
			.then((r) => {
				if (r.status === 200) {
					return r.json();
				} else {
					// TODO: Display error on page
					console.log(r.status);
				}
			})
			.then((newProfile) => {
				history.push(`/user/${newProfile._id}`);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="row window" id="settings">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div
					className="column small-12 medium-4 medium-push-8"
					id="settings-image"
				>
					<img
						src="http://gravatar.com/avatar/9e6cb7c90ee951ac7f6280cbad6876a6?s=200"
						id="profile-image-preview"
						alt="user"
					/>
					<fieldset id="image-source">
						<legend>Image source</legend>
						<div className="group">
							<input
								type="radio"
								name="image-source"
								value="gravatar"
								checked="checked"
								id="gravatar-radio"
							/>
							<label for="gravatar-radio">Gravatar</label>
						</div>
						<div className="group">
							<input
								type="radio"
								name="image-source"
								value="upload"
								id="upload-radio"
							/>
							<label for="upload-radio">Upload</label>
							<label className="button" for="img-upload" id="img-upload-button">
								{" "}
								<i className="fa fa-upload"> </i> Upload
							</label>
							<input type="file" id="img-upload" />
						</div>
					</fieldset>
				</div>
				<div
					className="column small-12 medium-8 medium-pull-4"
					id="settings-info"
				>
					<div className="input-group">
						<span className="input-group-label">Name</span>
						<input
							className="input-group-field"
							type="text"
							{...register("name")}
						/>
					</div>
					<div className="input-group">
						<span className="input-group-label">Bio</span>
						<textarea
							className="input-group-field"
							rows="3"
							{...register("bio")}
						></textarea>
					</div>
					<div className="input-group">
						<span className="input-group-label">Website</span>
						<input
							className="input-group-field"
							type="text"
							{...register("website")}
						/>
					</div>
					<div className="input-group">
						<span className="input-group-label">URL</span>
						<label className="input-group-label data-label" for="url-input">
							giffard.com/u/
						</label>
						<input
							className="input-group-field"
							type="text"
							id="url-input"
							{...register("username")}
						/>
					</div>
					<button className="button float-right" type="submit" value="Submit">
						<i className="fa fa-save" aria-hidden="true"></i> Save
					</button>
				</div>
			</form>
		</div>
	);
}

export default UserSettingsForm;
