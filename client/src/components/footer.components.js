import React from "react";

function Footer() {
	return (
		<div className="FooterComponent">
			<div class="footer">
				<div class="row">
					<div class="column medium-3 small-12">
						<h1 class="logo">GIFFARD</h1>
					</div>
					<div class="column medium-6 small-12 end">
						<ul>
							<li>
								{" "}
								<a href="https://drewvanvlack.com">About</a>
							</li>
							<li>
								<a href="https://github.com/AVanVlack/Giffard">Github</a>
							</li>
							<li>
								{" "}
								<a href="https://github.com/AVanVlack/Giffard/issues">Bugs</a>
							</li>
							<li>
								{" "}
								<a href="mailto:a.vanvlack@gmail.com">Contact</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="row column small-12">
					<p class="copyright">&copy;2021 Drew VanVlack</p>
				</div>
			</div>
		</div>
	);
}

export default Footer;
