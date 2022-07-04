import React, { Component } from "react";
import spin from "./Spinner.gif";
export default class Spinner extends Component {
	render() {
		return (
			<div className="text-center my-3">
				<img src={spin} alt="loading chal raha hai" />
			</div>
		);
	}
}
