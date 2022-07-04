import "./App.css";
import Navbar from "./components/Navbar.js";
import React, { Component } from "react";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends Component {
	state = {
		progress: 0,
	};
	setProgress = (progress) => {
		this.setState({ progress: progress });
	};
	render() {
		return (
			<>
				<BrowserRouter>
					<Navbar></Navbar>
					<div>
						<LoadingBar
							color="#f11946"
							height={3}
							progress={this.state.progress}
						/>
					</div>
					<Routes>
						<Route
							exact
							path="/"
							element={
								<News
									setProgress={this.setProgress}
									key="general"
									pageSize={5}
									country={"in"}
									category={"general"}
								></News>
							}
						/>
						<Route
							exact
							path="/business"
							element={
								<News
									setProgress={this.setProgress}
									key="business"
									pageSize={5}
									country={"in"}
									category={"business"}
								></News>
							}
						/>
						<Route
							exact
							path="/entertainment"
							element={
								<News
									setProgress={this.setProgress}
									pageSize={5}
									country={"in"}
									key="entertainment"
									category={"entertainment"}
								></News>
							}
						/>
						<Route
							exact
							path="/health"
							element={
								<News
									setProgress={this.setProgress}
									key="health"
									pageSize={5}
									country={"in"}
									category={"health"}
								></News>
							}
						/>
						<Route
							exact
							path="/science"
							element={
								<News
									setProgress={this.setProgress}
									key="science"
									pageSize={5}
									country={"in"}
									category={"science"}
								></News>
							}
						/>
						<Route
							exact
							path="/sports"
							element={
								<News
									setProgress={this.setProgress}
									key="sports"
									pageSize={5}
									country={"in"}
									category={"sports"}
								></News>
							}
						/>
						<Route
							exact
							path="/technology"
							element={
								<News
									setProgress={this.setProgress}
									pageSize={5}
									country={"in"}
									key="technology"
									category={"technology"}
								></News>
							}
						/>
					</Routes>
				</BrowserRouter>
			</>
		);
	}
}
