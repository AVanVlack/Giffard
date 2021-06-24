import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import Tags from "./elements/tags";

function Gif() {
	const [tab, setTab] = useState(1);
	const [gif, setGif] = useState({});
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
				setStatus("resolved");
				console.log(data);
				setTags(data.tags);
			})
			.catch((err) => {
				console.log(err);
				//return setError(err.response.data);
			});
	}, []);
	return (
		<div className="App">
			{status === "loading" ? (
				<div id="loading-spinner">
					<i class="fa fa-spinner fa-pulse fa-3x fa-fw "></i>
				</div>
			) : (
				<div>
					<div class="row column gif-view">
						<img src={gif.gifUrl} />
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
							{user != null && user._id === gif.author ? (
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
										<a class="uploader">
											<img src="http://gravatar.com/avatar/9e6cb7c90ee951ac7f6280cbad6876a6?s=80&amp;d=https://codepen.io/assets/avatars/user-avatar-80x80-94696e1c3870f64217a8040eedd4a1ed.png" />
											<h6>Vanvlack</h6>
										</a>
										<p class="description">{gif.description}</p>
									</div>
									<div class="column small-12 medium-5">
										<h5 class="cat">{gif.catagories}</h5>
										<ul class="tags">
											{gif.tags.map((t) => {
												return (
													<li>
														<a>{t}</a>
													</li>
												);
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
												<a href={gif.gifUrl} download>
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
											<input class="input-group-field" value="Help Me" />
										</div>
										<div class="input-group">
											<span class="input-group-label">Category</span>
											<select class="input-group-field">
												<option>Funny</option>
												<option>Reaction > Scared </option>
												<option>Reaction > Cry</option>
												<option>Reaction > </option>
												<option>Reaction</option>
												<option selected="true">Actions > Fail</option>
												<option>Actions > </option>
												<option></option>
											</select>
										</div>
									</div>
									<div class="column small-12 medium-6">
										<div class="input-group tag-edit">
											<span class="input-group-label">Tags</span>
											<div class="tag-group">
												<Tags tags={tags} setTags={setTags} />
											</div>
										</div>
									</div>
								</div>
								<div class="row column">
									<button class="button">Save</button>
									<button class="button">Cancel</button>
									<button class="button">
										<i class="fa fa-trash"></i> Delete
									</button>
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
