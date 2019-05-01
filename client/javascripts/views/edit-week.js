import React from "react";
import { Table } from 'reactstrap';
import DynamicComponent from '../components/dynamic-component';
import { toDateString } from '../utils/date';

function Child(props){
	var {data} = props;
	return (
		<tr>
			<td>{data.name} {data.surname}</td>
			<td><input type="radio" name={data.uuid} value="PRESENT"/></td>
			<td><input type="radio" name={data.uuid} value="ABSENT" defaultChecked/></td>
		</tr>
	)
}

class ListChild extends React.Component{
	onSubmit(evt){
		evt.preventDefault();
		var data = new FormData(evt.target);
		var childList = [];
		for(var entry of data.entries()){
			var id = entry[0], status = entry[1];
			if(status === "PRESENT") childList.push(id);
			// data.delete(id);
		}

		var body = new URLSearchParams();
		body.append("date", this.props.week.date.toISOString());
		body.append("year", this.props.class.year);
		body.append("grade", this.props.class.grade);
		body.append("child", JSON.stringify(childList));

		fetch("/week/edit", {
			method: "post",
			body
		})
	}

	render(){
		var {class: clas} = this.props;
		var loader = () => fetch(`/class/get-child-list?grade=${clas.grade}&year=${clas.year}`).then( res => res.json() );

		return (
		  <DynamicComponent load={loader}>
		    { list => list === null ? 
		    	<p>Loading</p> : 
		    	<form onSubmit={this.onSubmit.bind(this)}>
			    	<input type="submit" value="submit"/>
		    		<Table>
			    		<thead>
				    		<tr>
				    			<th>Nama</th>
				    			<th>Hadir</th>
				    			<th>Absen</th>
				    		</tr>
			    		</thead>
			    		<tbody>
			    			{list.map( (data, i) => <Child key={i} data={data}/>)}
			    		</tbody>
			    	</Table>
		    	</form>
		    }
		  </DynamicComponent>
		)
	}
}

export default class View extends React.Component {
	getClassData(){
		return this.props.location.state.class;
	}

	getWeekData(){
		return this.props.location.state.week;
	}

	render() {
		var week = this.getWeekData();
		var clas = this.getClassData();
		return (
			<div>
				<h3>Absen Horong {clas.grade} tahun {clas.year}</h3>
				<h3>{toDateString(week.date)}</h3>
				<ListChild class={clas} week={week}/>
			</div>
		);
	}
}
