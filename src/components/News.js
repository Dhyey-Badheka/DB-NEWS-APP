import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
	static defaultProps = {
		country: "in",
		pageSize: 5,
		category: "general",
		date: Date.now() + "",
		source: "DB",
	};
	static propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
		category: PropTypes.string,
		date: PropTypes.string,
		source: PropTypes.string,
	};

	articles = [];
	constructor(props) {
		super(props);
		this.state = {
			articles: this.articles,
			loading: false,
			page: 1,
			totalResults: 1,
		};
		document.title =
			`${this.props.category}`.charAt(0).toUpperCase() +
			`${this.props.category}`.slice(1) +
			" - DB's NEWS";
	}

	async updatepage() {
		this.props.setProgress(40);
		let url = `https://newsapi.org/v2/top-headlines?country=${
			this.props.country
		}&category=${
			this.props.category
		}&apiKey=ace01cfa1e324345a4535e1943b58243&page=${
			this.state.page - 1
		}&pageSize=${this.props.pageSize}`;

		this.setState({ loading: true });
		let data = await fetch(url);
		let parsedData = await data.json();
		this.setState({
			articles: parsedData.articles,
			totalResults: parsedData.totalResults,
			loading: false,
			page: this.state.page + 1,
		});

		this.props.setProgress(100);
	}

	async componentDidMount() {
		// let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ace01cfa1e324345a4535e1943b58243&pageSize=${this.props.pageSize}`;

		// this.setState({ loading: true });
		// let data = await fetch(url);
		// let parsedData = await data.json();
		// this.setState({
		// 	articles: parsedData.articles,
		// 	totalResults: parsedData.totalResults,
		// 	loading: false,
		// });
		this.updatepage();
	}

	handleprevclick = async () => {
		// let url = `https://newsapi.org/v2/top-headlines?country=${
		// 	this.props.country
		// }&category=${
		// 	this.props.category
		// }&apiKey=ace01cfa1e324345a4535e1943b58243&page=${
		// 	this.state.page - 1
		// }&pageSize=${this.props.pageSize}`;
		// this.setState({ loading: true });
		// let data = await fetch(url);
		// let parsedData = await data.json();
		// this.setState({
		// 	page: this.state.page - 1,
		// 	articles: parsedData.articles,
		// 	loading: false,
		// });

		this.updatepage();
	};
	handlenextclick = async () => {
		if (
			!(
				this.state.page + 1 >
				Math.ceil(this.state.totalResults / this.props.pageSize)
			)
		) {
			// let url = `https://newsapi.org/v2/top-headlines?country=${
			// 	this.props.country
			// }&category=${
			// 	this.props.category
			// }&apiKey=ace01cfa1e324345a4535e1943b58243&page=${
			// 	this.state.page + 1
			// }&pageSize=${this.props.pageSize}`;
			// this.setState({ loading: true });
			// let data = await fetch(url);
			// let parsedData = await data.json();
			// this.setState({
			// 	page: this.state.page + 1,
			// 	articles: parsedData.articles,
			// 	loading: false,
			// });
			this.updatepage();
		}
	};

	fetchMoreData = async () => {
		this.setState({ page: this.state.page + 1 });
		this.setState({ loading: true });

		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ace01cfa1e324345a4535e1943b58243&page=${this.state.page}&pageSize=${this.props.pageSize}`;

		let data = await fetch(url);
		let parsedData = await data.json();
		this.setState({
			articles: this.state.articles.concat(parsedData.articles),
			totalResults: parsedData.totalResults,
			loading: false,
		});
	};

	render() {
		return (
			<>
				<h1 className="text-center" style={{ margin: "35px" }}>
					Top Headlines - {`${this.props.category}`.charAt(0).toUpperCase()}
					{`${this.props.category}`.slice(1)} Category
				</h1>
				{/* {this.state.loading && <Spinner />} */}
				<InfiniteScroll
					dataLength={this.state.articles.length}
					next={this.fetchMoreData}
					hasMore={this.state.articles.length !== this.state.totalResults}
					loader={this.state.loading && <Spinner />}
				>
					<div className="container">
						<div className="row">
							{this.state.articles.map((element) => {
								return (
									<div className="col-md-4 mx-10 my-1" key={element.url}>
										<NewsItem
											title={element.title}
											description={element.description}
											imageurl={element.urlToImage}
											url={element.url}
											date={element.publishedAt}
											source={element.source.name}
										></NewsItem>
									</div>
								);
							})}
						</div>
					</div>
				</InfiniteScroll>

				{/* <div className="container d-flex justify-content-between">
					<button
						className="btn mx-3 my-3 btn-dark"
						onClick={this.handleprevclick}
						disabled={this.state.page <= 1}
					>
						&larr; Previous
					</button>
					<button
						className="btn my-3 btn-dark"
						disabled={
							this.state.page + 1 >
							Math.ceil(this.state.totalResults / this.props.pageSize)
						}
						onClick={this.handlenextclick}
					>
						Next &rarr;
					</button>
				</div> */}
			</>
		);
	}
}

export default News;
