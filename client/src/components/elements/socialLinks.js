export default function SocialLinks({ url, title }) {
	return (
		<ul id="social-networks">
			<li class="facebook">
				<a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}>
					<i class="fa fa-lg fa-facebook"></i>
				</a>
			</li>
			<li class="twitter">
				<a href={`https://twitter.com/share?text=${title}&url=${url}`}>
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
				<a href={`http://reddit.com/submit?url=${url}L&amp;title=${title}`}>
					<i class="fa fa-lg fa-reddit-alien"></i>
				</a>
			</li>
			<li class="pinterest">
				<a
					href={`https://pinterest.com/pin/create/button/?url=&lt;${url}&gt;&amp;description=&lt;${title}&gt;`}
				>
					<i class="fa fa-lg fa-pinterest-p"></i>
				</a>
			</li>
			<li class="download">
				<a href={url} target="_blank" rel="noreferrer" download>
					<i class="fa fa-lg fa-download"></i>
				</a>
			</li>
		</ul>
	);
}
