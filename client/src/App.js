import "./foundations.css";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./components/main.component";
import Navbar from "./components/navbar.component";
import Footer from "./components/footer.components";
import Gif from "./components/gif.component";
import Profile from "./components/profile.components";
import Settings from "./components/settings.components";
import Upload from "./components/upload.components";

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<Switch>
					<Route exact path="/">
						<Main />
					</Route>
					<Route exact path="/gif/:Id">
						<Gif />
					</Route>
					<Route exact path="/profile/:Id">
						<Profile />
					</Route>
					<Route exact path="/Settings">
						<Settings />
					</Route>
					<Route exact path="/Upload">
						<Upload />
					</Route>
				</Switch>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
