import React, { Component } from "react";
import DynamicComponent from '../components/dynamic-component';

function Child(props){
	var {data} = props;
	return (
		<option value={data.uuid}>{data.name} {data.surname}</option>
	)
}

class SelectChild extends Component{
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
		var loader = () => fetch("/child/get-list").then( res => res.json() );

		return (
		  <DynamicComponent load={loader}>
		    { list => list === null ? 
		    	<p>Loading</p> :
		    	<div> 
			    	<select onChange={this.onChange.bind(this)} multiple>
			    		{list.map( (data, i) => <Child key={i} data={data}/>)}
			    	</select>
			    	<input type="text" name="child" style={{display:"none"}} value={this.state.result} readOnly/>
			    </div>
		    }
		  </DynamicComponent>
		)
	}
}

export default class view extends Component {
	onSubmit(evt){
		evt.preventDefault();

		fetch("/class/edit", {
			method: "post",
			body: new FormData(evt.target)
		}).then( res => {
			if(res.status === 200){
				this.props.history.push("/class");
			}
		});
	}

	getClassData(){
		return this.props.location.state.data;
	}

	render(){
		var data = this.getClassData();
		return (
			<div>
				<form onSubmit={this.onSubmit.bind(this)}>
					<label>Tahun</label>
					<input type="text" name="year" value={data.year} readOnly/><br/>

					<label>Horong</label>
					<input type="text" name="grade" value={data.grade} readOnly/><br/>
				  	
					<SelectChild/>
					<input type="submit" value="submit"/>
				</form>
			</div>
		);
	}
}
