import React from "react";

function Gif() {
	return (
		<div className="App">
			<div class="row column gif-view">
				<img src="https://media.giphy.com/media/oje6kPRIef6Gk/giphy.gif" />
			</div>
			<div class="row column gif-details">
				<ul class="tabs" id="control-details" data-tabs="data-tabs">
					<li class="tabs-title is-active">
						<a href="#details-tab" aria-selected="true">
							DETAILS
						</a>
					</li>
					<li class="tabs-title">
						<a href="#share-tab">SHARE</a>
					</li>
					<li class="tabs-title">
						<a href="#settings-tab">EDIT</a>
					</li>
				</ul>
				<div class="tabs-content" data-tabs-content="control-details">
					<div class="tabs-panel is-active" id="details-tab">
						<div class="row">
							<div class="column small-12 medium-7">
								<h3 class="title">HELP ME </h3>
								<a class="uploader">
									<img src="http://gravatar.com/avatar/9e6cb7c90ee951ac7f6280cbad6876a6?s=80&amp;d=https://codepen.io/assets/avatars/user-avatar-80x80-94696e1c3870f64217a8040eedd4a1ed.png" />
									<h6>Vanvlack</h6>
								</a>
								<p class="description">
									A scene from spirited away where a dust sprite purposely gives
									up carry a rock to get sympathy from Chihiro.
								</p>
							</div>
							<div class="column small-12 medium-5">
								<h5 class="cat">ACTIONS | FAIL</h5>
								<ul class="tags">
									<li>
										<a>spirited away</a>
									</li>
									<li>
										<a>rock</a>
									</li>
									<li>
										<a>dust sprite</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="tabs-panel" id="share-tab">
						<div class="row">
							<div class="column small-12 medium-8">
								<span>GIFFARD LINK: </span>
								<input
									class="copy-click"
									readonly="readonly"
									value="http://giffard.com/hg443slk/"
								/>
								<span>DIRECT LINK: </span>
								<input
									class="copy-click"
									readonly="readonly"
									value="http://giffard.com/gif/hg443slk/"
								/>
								<a href="#filedownload"></a>
							</div>
							<div class="column small-12 medium-4">
								<ul id="social-networks">
									<li class="facebook">
										<a href="https://www.facebook.com/sharer/sharer.php?u=https://scotch.io">
											<i class="fa fa-lg fa-facebook"></i>
										</a>
									</li>
									<li class="twitter">
										<a href="https://twitter.com/share?text=&lt;TITLE&gt;&amp;url=&lt;URL&gt;">
											<i class="fa fa-lg fa-twitter"></i>
										</a>
									</li>
									<li class="tumblr">
										<a href="https://www.tumblr.com/share/link?url=SHARE_URL&amp;name=SHARE_TITLE&amp;description=SHARE_CONTENT">
											<i class="fa fa-lg fa-tumblr"></i>
										</a>
									</li>
									<li class="reddit">
										<a href="http://reddit.com/submit?url=SHARE_URL&amp;title=SHARE_TITLE">
											<i class="fa fa-lg fa-reddit-alien"></i>
										</a>
									</li>
									<li class="pinterest">
										<a href="https://pinterest.com/pin/create/button/?url=&lt;URL&gt;&amp;description=&lt;TITLE&gt;">
											<i class="fa fa-lg fa-pinterest-p"></i>
										</a>
									</li>
									<li class="download">
										<a href="https://pinterest.com/pin/create/button/?url=&lt;URL&gt;&amp;description=&lt;TITLE&gt;">
											<i class="fa fa-lg fa-download"></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="tabs-panel" id="settings-tab">
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
										<input
											class="tm-input input-group-field"
											type="text"
											name="tags"
											placeholder=""
										/>
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
	);
}

export default Gif;
