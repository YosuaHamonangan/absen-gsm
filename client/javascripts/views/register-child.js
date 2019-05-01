import React, { Component } from "react";

export default class view extends Component {
	onSubmit(evt){
		evt.preventDefault();

		var body = new FormData(evt.target);
		fetch("/child/register", {
			method: "post",
			body
		})
		.then( res => {
			if(res.status === 200){
				this.props.history.push("/child");
			}
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit.bind(this)}>
					<label>Nama</label>
					<input type="text" name="name"/><br/>

					<label>marga</label>
					<input type="text" name="surname"/><br/>
				  	
				  	<label>alamat</label>
					<input type="text" name="address"/><br/>
					
					<label>noHp</label>
					<input type="text" name="phone"/><br/>
				  	
					<input type="submit" value="submit"/>
				</form>
			</div>
		);
	}
}
