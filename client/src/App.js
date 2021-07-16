import "foundation-sites/dist/foundation.css";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { UserContext } from "./hooks/UserContext";
import useFindUser from "./hooks/useFindUser";

import Main from "./components/main.component";
import Navbar from "./components/navbar.component";
import Footer from "./components/footer.components";
import Gif from "./components/gif.component";
import Profile from "./components/profile.components";
import Settings from "./components/settings.components";
import Upload from "./components/upload.components";
import Login from "./components/login.component";
import Categories from "./components/categories.component";

function App() {
	const { user, setUser, isLoading } = useFindUser();
	return (
		<Router>
			<div className="App">
				<UserContext.Provider value={{ user, setUser, isLoading }}>
					<Navbar />
					<Switch>
						<Route exact path={["/", "/categories/:cat"]}>
							<Main />
						</Route>
						<Route exact path="/gif/:id">
							<Gif />
						</Route>
						<Route exact path={["/user/:id", "/u/:id"]}>
							<Profile />
						</Route>
						<Route exact path="/settings">
							<Settings />
						</Route>
						<Route exact path="/upload">
							<Upload />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/categories">
							<Categories />
						</Route>
					</Switch>
					<Footer />
				</UserContext.Provider>
			</div>
		</Router>
	);
}

export default App;
