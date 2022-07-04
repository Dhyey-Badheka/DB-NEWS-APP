import React, { Component } from "react";

export class NewsItem extends Component {
	render() {
		let { title, description, imageurl, url, date, source } = this.props;
		return (
			<div>
				<div className="card my-2">
					<img
						src={
							imageurl
								? imageurl
								: "https://english.cdn.zeenews.com/sites/default/files/2022/07/03/1060745-untitled-design-89.jpg"
						}
						className="card-img-top"
						alt="..."
					/>
					<div className="card-body   bg-success bg-dark text-white bg-info bg-gradient">
						<h5 className="card-title ">{title}</h5>
						<h5>
							<span className="badge rounded-pill text-bg-danger">
								{source}
							</span>
						</h5>
						<p className="card-text">{description}...</p>
						<p className="card-text">
							<small className="text-white">
								{new Date(date).toGMTString()}
							</small>
						</p>
						<a href={url} className="btn btn-sm btn-primary">
							Read More
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default NewsItem;
