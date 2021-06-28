import React, { useEffect, useState, useContext, history } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import Tags from "./elements/tags";
import useFetch from "../hooks/useFetch";
import ConfirmButton from "./elements/confirm";
import CategorySelect from "./elements/categorySelect";
import SocialLinks from "./elements/socialLinks";

function Gif() {
	const [tab, setTab] = useState(1);
	const [gif, setGif] = useState({});
	const [editInputs, setEditInputs] = useState({});
	const [editSelect, setEditSelect] = useState();
	const [tags, setTags] = useState([]);
	const [pageStatus, setPageStatus] = useState("loading");

	const { user } = useContext(UserContext);

	let { id } = useParams();
	useEffect(() => {
		const options = {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		};
		setPageStatus("loading");
		fetch(`/api/gifs/${id}`, options)
			.then((r) => r.json())
			.then(async (data) => {
				setGif(data);
				setEditInputs(data);
				setEditSelect(data.catagories);
				setTags(data.tags.map((t) => ({ id: t, text: t })));
				setPageStatus("resolved");
			})
			.catch((err) => {
				console.log(err);
				//return setError(err.response.data);
			});
	}, []);

	const handleDelete = () => {
		const options = {
			method: "DELETE",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};
		fetch(`/api/gifs//delete/${id}`, options)
			.then((r) => r.json())
			.then(async (data) => {
				history.push("/");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditInputs((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleEdit = (e) => {
		e.preventDefault();
		setPageStatus("loading");
		const data = editInputs;
		data.tags = tags.map((e) => e.text); // Remove keys on tags
		data.catagories = editSelect;
		const options = {
			body: JSON.stringify(data),
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};
		fetch(`/api/gifs/update/${id}`, options)
			.then((r) => r.json())
			.then(async (data) => {
				setGif(data);
				setPageStatus("resolved");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="App">
			{pageStatus === "loading" ? (
				<div id="loading-spinner">
					<i class="fa fa-spinner fa-pulse fa-3x fa-fw "></i>
				</div>
			) : (
				<div>
					<div class="row column gif-view">
						<img alt={`Animated Gif: ${gif.title}`} src={gif.gifUrl} />
					</div>
					<div class="row column gif-details">
						<ul class="tabs" id="control-details" data-tabs="data-tabs">
							<li class="tabs-title is-active">
								<a onClick={() => setTab(1)} aria-selected={tab === 1}>
									DETAILS
								</a>
							</li>
							<li class="tabs-title">
								<a onClick={() => setTab(2)} aria-selected={tab === 2}>
									SHARE
								</a>
							</li>
							{user != null && user._id === gif.author._id ? (
								<li class="tabs-title">
									<a onClick={() => setTab(3)} aria-selected={tab === 3}>
										EDIT
									</a>
								</li>
							) : (
								""
							)}
						</ul>
						<div class="tabs-content">
							<div
								className={`tabs-panel ${tab === 1 ? "is-active" : ""}`}
								id="signup-tab"
							>
								<div class="row">
									<div class="column small-12 medium-7">
										<h2 class="title">{gif.title}</h2>

										<p class="description">{gif.description}</p>
										<a href={`/user/${gif.author._id}`} class="uploader">
											<img src={gif.author.image} alt="User" />
											<h6>{gif.author.username}</h6>
										</a>
									</div>
									<div class="column small-12 medium-5">
										<h4 class="cat">{gif.catagories}</h4>
										<ul class="tags">
											{gif.tags.map((t) => {
												return <li>#{t}</li>;
											})}
										</ul>
									</div>
								</div>
							</div>
							<div
								className={`tabs-panel ${tab === 2 ? "is-active" : ""}`}
								id="signup-tab"
							>
								<div class="row">
									<div class="column small-12 medium-8">
										<span>GIFFARD LINK: </span>
										<input
											class="copy-click"
											readonly="readonly"
											value={window.location.href}
										/>
										<span>DIRECT LINK: </span>
										<input
											class="copy-click"
											readonly="readonly"
											value={gif.gifUrl}
										/>
									</div>
									<div class="column small-12 medium-4">
										<SocialLinks url={window.location.href} title={gif.title} />
									</div>
								</div>
							</div>
							<div
								className={`tabs-panel ${tab === 3 ? "is-active" : ""}`}
								id="signup-tab"
							>
								<form onSubmit={handleEdit}>
									<div class="row">
										<div class="column small-12 medium-6">
											<div class="input-group">
												<span class="input-group-label">Title</span>
												<input
													class="input-group-field"
													type="text"
													placeholder="Title"
													value={editInputs.title}
													onChange={handleInputChange}
													name="title"
												/>
											</div>
											<div class="input-group">
												<span class="input-group-label">Description</span>
												<textarea
													rows="3"
													class="input-group-field"
													type="text"
													placeholder="Description"
													value={editInputs.description}
													onChange={handleInputChange}
													name="description"
												></textarea>
											</div>
										</div>
										<div class="column small-12 medium-6">
											<div class="input-group">
												<span class="input-group-label">Category</span>
												<CategorySelect
													value={editSelect}
													setValue={setEditSelect}
												/>
											</div>
											<div class="input-group tag-edit">
												<span class="input-group-label">Tags</span>
												<div class="tag-group">
													<Tags tags={tags} setTags={setTags} />
												</div>
											</div>
										</div>
									</div>
									<div class="row column">
										<div class="button-group">
											<button class="button" type="submit" value="Submit">
												<i class="fa fa-floppy-o" aria-hidden="true"></i> Save
											</button>
											<ConfirmButton
												title="Delete Gif"
												icon="fa-trash"
												action={handleDelete}
											/>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Gif;
