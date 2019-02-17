import React, { Component } from "react";

export default class view extends Component {
	render() {
		return (
			<div>
				<form action="/murid/register" method="post">
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
