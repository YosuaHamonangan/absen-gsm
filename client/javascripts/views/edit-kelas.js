import React, { Component } from "react";
import DynamicComponent from '../components/dynamic-component';

function Murid(props){
	var {data} = props;
	return (
		<option value={data.id}>{data.nama} {data.marga}</option>
	)
}

class SelectMurid extends Component{
	constructor(props){
		super(props);

		this.state = {
			result: "[]"
		}
	}

	onChange(evt){
		var options = evt.target.options;
		var result = [];
		for(var i = 0; i < options.length; i++){
			var option = options[i];
			if(option.selected) result.push(option.value);
		}

		this.setState({
			result: JSON.stringify(result)
		})

	}

	render() {
		var loader = () => fetch("/murid/get-list").then( res => res.json() );

		return (
		  <DynamicComponent load={loader}>
		    { list => list === null ? 
		    	<p>Loading</p> :
		    	<div> 
			    	<select onChange={this.onChange.bind(this)} multiple>
			    		{list.map( (data, i) => <Murid key={i} data={data}/>)}
			    	</select>
			    	<input type="text" name="murid" style={{display:"none"}} value={this.state.result} readOnly/>
			    </div>
		    }
		  </DynamicComponent>
		)
	}
}

export default class view extends Component {
	onSubmit(evt){
		evt.preventDefault();

		var inputData = new FormData(evt.target);
		var currentData = this.getKelasData();
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

		fetch("/kelas/edit", {
			method: "post",
			body
		})
		.then( res => {
			if(res.status === 200){
				this.props.history.push("/kelas");
			}
		});
	}

	getKelasData(){
		return this.props.location.state.data;
	}

	render(){
		var data = this.getKelasData();
		return (
			<div>
				<form onSubmit={this.onSubmit.bind(this)}>
					<label>Tahun</label>
					<input type="text" name="tahun" value={data.tahun} disabled/><br/>

					<label>Horong</label>
					<input type="text" name="horong" value={data.horong} disabled/><br/>
				  	
					<SelectMurid/>
					<input type="submit" value="submit"/>
				</form>
			</div>
		);
	}
}
