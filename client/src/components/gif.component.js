import React, { useEffect, useState, useContext, history } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import Tags from "./elements/tags";
import useFetch from "../hooks/useFetch";
import ConfirmButton from "./elements/confirm";

function Gif() {
	const [tab, setTab] = useState(1);
	const [gif, setGif] = useState({});
	const [gifEdit, setGifEdit] = useState({});
	const [tags, setTags] = useState([]);
	const [status, setStatus] = useState("loading");
	const { user } = useContext(UserContext);

	let { id } = useParams();
	useEffect(() => {
		const options = {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		};
		setStatus("loading");
		fetch(`/api/gifs/${id}`, options)
			.then((r) => r.json())
			.then(async (data) => {
				setGif(data);
				setGifEdit(data);
				setTags(data.tags.map((t) => ({ id: t, text: t })));
				setStatus("resolved");
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
		fetch(`/api/users`, options)
			.then((r) => r.json())
			.then(async (data) => {
				history.push("/");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setGifEdit((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<div className="App">
			{status === "loading" ? (
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
										<h3 class="title">{gif.title}</h3>
										<a href={`/user/${gif.author._id}`} class="uploader">
											<img src={gif.author.image} alt="User" />
											<h6>{gif.author.username}</h6>
										</a>
										<p class="description">{gif.description}</p>
									</div>
									<div class="column small-12 medium-5">
										<h5 class="cat">{gif.catagories}</h5>
										<ul class="tags">
											{gif.tags.map((t) => {
												return <li>{t}</li>;
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
										<a href="#filedownload"></a>
									</div>
									<div class="column small-12 medium-4">
										<ul id="social-networks">
											<li class="facebook">
												<a
													href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
												>
													<i class="fa fa-lg fa-facebook"></i>
												</a>
											</li>
											<li class="twitter">
												<a
													href={`https://twitter.com/share?text=${gif.title}&url=${window.location.href}`}
												>
													<i class="fa fa-lg fa-twitter"></i>
												</a>
											</li>
											<li class="tumblr">
												<a
													href={`https://www.tumblr.com/share/link?url=SHARE_URL&amp;name=SHARE_TITLE&amp;description=SHARE_CONTENT`}
												>
													<i class="fa fa-lg fa-tumblr"></i>
												</a>
											</li>
											<li class="reddit">
												<a
													href={`http://reddit.com/submit?url=${window.location.href}L&amp;title=${gif.title}`}
												>
													<i class="fa fa-lg fa-reddit-alien"></i>
												</a>
											</li>
											<li class="pinterest">
												<a
													href={`https://pinterest.com/pin/create/button/?url=&lt;${window.location.href}&gt;&amp;description=&lt;${gif.title}&gt;`}
												>
													<i class="fa fa-lg fa-pinterest-p"></i>
												</a>
											</li>
											<li class="download">
												<a
													href={gif.gifUrl}
													target="_blank"
													rel="noreferrer"
													download
												>
													<i class="fa fa-lg fa-download"></i>
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div
								className={`tabs-panel ${tab === 3 ? "is-active" : ""}`}
								id="signup-tab"
							>
								<div class="row">
									<div class="column small-12 medium-6">
										<div class="input-group">
											<span class="input-group-label">Title</span>
											<input
												class="input-group-field"
												type="text"
												placeholder="Title"
												value={gifEdit.title}
												onChange={handleChange}
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
												value={gifEdit.description}
												onChange={handleChange}
												name="description"
											></textarea>
										</div>
									</div>
									<div class="column small-12 medium-6">
										<div class="input-group">
											<span class="input-group-label">Category</span>
											<select class="input-group-field">
												<option>Funny</option>
												<option>News</option>
												<option>Music</option>
												<option>Reaction </option>
												<option>Animals</option>
												<option selected="true">Emotions</option>
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
								<div class="row column">
									<div class="button-group">
										<button class="button">
											<i class="fa fa-floppy-o" aria-hidden="true"></i> Save
										</button>
										<ConfirmButton
											title="Delete Gif"
											icon="fa-trash"
											action={handleDelete}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Gif;
