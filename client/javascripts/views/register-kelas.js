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
	render() {
		return (
			<div>
				<form action="/kelas/register" method="post">
					<label>tahun</label>
					<input type="text" name="tahun"/><br/>

					<label>horong</label>
					<input type="text" name="horong"/><br/>

					<label>Murid :</label>
					<SelectMurid/>

					<input type="submit" value="submit"/>
				</form>
			</div>
		);
	}
}
