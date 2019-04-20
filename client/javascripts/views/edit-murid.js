import React, { Component } from "react";

export default class view extends Component {
	onSubmit(evt){
		evt.preventDefault();

		var inputData = new FormData(evt.target);
		var currentData = this.getMuridData();
		var body = new FormData();
		body.append("id", currentData.id)

		for(var d of inputData.entries()){
			var id = d[0],
				inputVal = d[1],
				currentVal = currentData[id];

			if(inputVal != currentVal){
				body.append(id, inputVal);
			}
		}

		fetch("/murid/edit", {
			method: "post",
			body
		})
		.then( res => {
			if(res.status === 200){
				this.props.history.push("/murid");
			}
		});
	}

	getMuridData(){
		return this.props.location.state.data;
	}

	render(){
		var data = this.getMuridData();
		return (
			<div>
				<form onSubmit={this.onSubmit.bind(this)}>
					<label>foto</label>
				  	{
				  		data.foto ? 
				  			<div><img src={`murid/get-image?id=${data.foto}`} /></div> : null
				  	}
					<input type="file" name="foto"/><br/><br/>

					<label>Nama</label>
					<input type="text" name="nama" defaultValue={data.nama}/><br/>

					<label>marga</label>
					<input type="text" name="marga" defaultValue={data.marga}/><br/>
				  	
				  	<label>alamat</label>
					<input type="text" name="alamat" defaultValue={data.alamat}/><br/>
					
					<label>noHp</label>
					<input type="text" name="noHp" defaultValue={data.noHp}/><br/>
				  	
					<input type="submit" value="submit"/>
				</form>
			</div>
		);
	}
}
