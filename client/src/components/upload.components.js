import { useState } from "react";
import { useHistory } from "react-router-dom";
import Tags from "./elements/tags";
import CategorySelect from "./elements/categorySelect";

function Upload() {
	const [tags, setTags] = useState([]);
	const [editSelect, setEditSelect] = useState("");
	const [inputs, setInputs] = useState({});
	const [pageState, setPageState] = useState("resolved");
	let history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		setPageState("loading");
		// Create an object of formData
		const formData = new FormData();
		const keyless = tags.map((e) => e.text);

		// Update the formData object
		formData.append("file", inputs.file, inputs.file.name);
		formData.append("title", inputs.title);
		formData.append("description", inputs.description);
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

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setInputs((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const onFileChange = (e) => {
		setInputs((oldState) => ({ ...oldState, file: e.target.files[0] }));
		console.log(inputs.file);
	};

	return (
		<div className="UploadComponent">
			{pageState === "loading" && (
				<div id="loading-spinner">
					<i class="fa fa-spinner fa-pulse fa-3x fa-fw "></i>
				</div>
			)}
			{pageState === "resolved" && (
				<div>
					<form onSubmit={handleSubmit}>
						<div class="row column window" id="upload-input">
							<div class="input-group">
								<input
									class="input-group-field"
									placeholder="Input URL or drop Gif here"
								/>
								<input id="file-input" type="file" onChange={onFileChange} />
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
									<input
										class="input-group-field"
										type="text"
										value={inputs.title}
										onChange={handleInputChange}
										name="title"
									/>
								</div>
								<div class="input-group">
									<span class="input-group-label">Description</span>
									<textarea
										class="input-group-field"
										rows="3"
										value={inputs.description}
										onChange={handleInputChange}
										name="description"
									></textarea>
								</div>
							</div>
							<div class="column small-12 medium-6">
								<div class="input-group">
									<span class="input-group-label">Category</span>
									<CategorySelect value={editSelect} setValue={setEditSelect} />
								</div>
								<div class="input-group tag-edit">
									<span class="input-group-label">Tags</span>
									<div class="tag-group">
										<Tags tags={tags} setTags={setTags} />
									</div>
								</div>
								<button class="button float-right" type="submit" value="Submit">
									<i class="fa fa-arrow-up" aria-hidden="true"></i> Upload
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
