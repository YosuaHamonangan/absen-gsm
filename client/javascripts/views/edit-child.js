import React, { Component } from "react";

export default class view extends Component {
	onSubmit(evt){
		evt.preventDefault();

		var inputData = new FormData(evt.target);
		var currentData = this.getChildData();
		var body = new FormData();
		body.append("uuid", currentData.uuid)

		for(var d of inputData.entries()){
			var id = d[0],
				inputVal = d[1],
				currentVal = currentData[id];

			if(inputVal != currentVal){
				body.append(id, inputVal);
			}
		}

		fetch("/child/edit", {
			method: "post",
			body
		})
		.then( res => {
			if(res.status === 200){
				this.props.history.push("/child");
			}
		});
	}

	getChildData(){
		return this.props.location.state.data;
	}

	render(){
		var data = this.getChildData();
		return (
			<div>
				<form onSubmit={this.onSubmit.bind(this)}>
					<label>foto</label>
				  	{
				  		data.photo ? 
				  			<div><img src={`get-image?id=${data.photo}`} /></div> : null
				  	}
					<input type="file" name="foto"/><br/><br/>

					<label>Nama</label>
					<input type="text" name="name" defaultValue={data.name}/><br/>

					<label>Marga</label>
					<input type="text" name="surname" defaultValue={data.surname}/><br/>
				  	
				  	<label>Alamat</label>
					<input type="text" name="address" defaultValue={data.address}/><br/>
					
					<label>Hp</label>
					<input type="text" name="phone" defaultValue={data.phone}/><br/>
				  	
					<input type="submit" value="submit"/>
				</form>
			</div>
		);
	}
}
