import React from "react";
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import DynamicComponent from '../components/dynamic-component';
import { toDateString, getNextSunday, dateIsEqual } from '../utils/date';

function Week(props){
	var {week, class: clas} = props;
	var linkTo = {
		pathname: "edit-week",
		state: {week, class: clas}
	};

	var present = week.childCount || 0;
	var absent = clas.childCount - present;;
	return (
		<tr>
			<td>{toDateString(week.date)}</td>
			<td>{present}</td>
			<td>{absent}</td>
			<td><Link to={linkTo}>Edit</Link></td>
		</tr>
	)
}

function ListWeek(props){
	var {class: clas} = props;
	var loader = () => fetch(`/week/get-list?grade=${clas.grade}&year=${clas.year}`)
		.then( res => res.json() )
		.then( list => {
			console.log(list)
			var nextSunday = getNextSunday();
			list.forEach( week => {
				week.date = new Date(week.date);
				if(nextSunday && dateIsEqual(week.date, nextSunday)){
					nextSunday = null;
				}
			});

			if(nextSunday) list.unshift({date: nextSunday});
			return Promise.resolve(list);
		});

	return (
	  <DynamicComponent load={loader}>
	    { list => list === null ? 
	    	<p>Loading</p> : 
	    	<Table>
	    		<thead>
		    		<tr>
		    			<th>Tanggal</th>
		    			<th>Jumlah Hadir</th>
		    			<th>Jumlah Absen</th>
		    			<th></th>
		    		</tr>
	    		</thead>
	    		<tbody>
	    			{list.map( (data, i) => <Week key={i} week={data} class={clas}/>)}
	    		</tbody>
	    	</Table>
	    }
	  </DynamicComponent>
	)
}


export default class View extends React.Component {

	getClassData(){
		return this.props.location.state.data;
	}

	render() {
		var data = this.getClassData();
		return (
			<div>
				<h3>Absen Horong {data.grade} tahun {data.year}</h3>
				<ListWeek class={data}/>
			</div>
		);
	}
}