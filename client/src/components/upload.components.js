import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Tags from "./elements/tags";
import CategorySelect from "./elements/categorySelect";

function Upload() {
	const [tags, setTags] = useState([]);
	const [editSelect, setEditSelect] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [pageState, setPageState] = useState("resolved");
	let history = useHistory();

	const onSubmit = (data) => {
		setPageState("loading");
		// Create an object of formData
		const formData = new FormData();
		const keyless = tags.map((e) => e.text);

		// Update the formData object
		formData.append("file", data.file[0], data.file[0].name);
		formData.append("title", data.title);
		formData.append("description", data.description);
		formData.append("tags", keyless.toString());
		formData.append("catagories", editSelect);

		const options = {
			body: formData,
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
			},
		};
		fetch(`/api/gifs/create`, options)
			.then((r) => {
				if (r.status === 200) {
					return r.json();
				}
			})
			.then((newGif) => {
				setPageState("resolved");
				history.push(`/gif/${newGif._id}`);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="UploadComponent">
			{pageState === "loading" && (
				<div id="loading-spinner">
					<i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>
				</div>
			)}
			{pageState === "resolved" && (
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="row column window" id="upload-input">
							<div className="input-group">
								<input
									className="input-group-field"
									placeholder="Input URL or drop Gif here"
								/>
								<input
									id="file-input"
									type="file"
									{...register("file", {
										required: "Please select a Gif to upload",
									})}
								/>
								<div className="input-group-button">
									<label className="button" htmlFor="file-input">
										Browse
									</label>
								</div>
							</div>
							<div className="invalid-feedback">{errors.file?.message}</div>
						</div>
						<div
							className="row window"
							id="upload-details"
							ng-app="myApp"
							ng-controller="MyCtrl"
						>
							<div className="column small-12 medium-6">
								<div className="input-group">
									<span className="input-group-label">Title</span>
									<input
										className="input-group-field"
										type="text"
										{...register("title", { required: "Title is required" })}
									/>
								</div>
								<div className="invalid-feedback">{errors.title?.message}</div>
								<div className="input-group">
									<span className="input-group-label">Description</span>
									<textarea
										className="input-group-field"
										rows="3"
										{...register("description", {
											required: "Description is required",
										})}
									></textarea>
								</div>
								<div className="invalid-feedback">
									{errors.description?.message}
								</div>
							</div>
							<div className="column small-12 medium-6">
								<div className="input-group">
									<span className="input-group-label">Category</span>
									<CategorySelect value={editSelect} setValue={setEditSelect} />
								</div>
								<div className="input-group tag-edit">
									<span className="input-group-label">Tags</span>
									<div className="tag-group">
										<Tags tags={tags} setTags={setTags} />
									</div>
								</div>
								<button
									className="button float-right"
									type="submit"
									value="Submit"
								>
									<i className="fa fa-arrow-up" aria-hidden="true"></i> Upload
								</button>
							</div>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}

export default Upload;
