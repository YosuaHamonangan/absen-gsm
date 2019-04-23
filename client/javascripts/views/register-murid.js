import React, { Component } from "react";

export default class view extends Component {
	onSubmit(evt){
		evt.preventDefault();

		var body = new FormData(evt.target);
		fetch("/murid/register", {
			method: "post",
			body
		})
		.then( res => {
			if(res.status === 200){
				this.props.history.push("/murid");
			}
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit.bind(this)}>
					<label>Nama</label>
					<input type="text" name="nama"/><br/>

					<label>marga</label>
					<input type="text" name="marga"/><br/>
				  	
				  	<label>alamat</label>
					<input type="text" name="alamat"/><br/>
					
					<label>noHp</label>
					<input type="text" name="noHp"/><br/>
				  	
				  	<label>foto</label>
					<input type="text" name="foto"/><br/>

					<input type="submit" value="submit"/>
				</form>
			</div>
		);
	}
}
