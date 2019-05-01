import React, { Component } from "react";

export default class view extends Component {
	onSubmit(evt){
		evt.preventDefault();

		var body = new FormData(evt.target);
		fetch("/class/register", {
			method: "post",
			body
		})
		.then( res => {
			if(res.status === 200){
				this.props.history.push("/class");
			}
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit.bind(this)}>
					<label>tahun</label>
					<input type="text" name="year"/><br/>

					<label>horong</label>
					<input type="text" name="grade"/><br/>

					<input type="submit" value="submit"/>
				</form>
			</div>
		);
	}
}
