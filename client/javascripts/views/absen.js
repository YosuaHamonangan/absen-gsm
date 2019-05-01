import React from "react";
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import DynamicComponent from '../components/dynamic-component';
import { toDateString, getNextSunday, dateIsEqual } from '../utils/date';

function Minggu(props){
	var {minggu, kelas} = props;
	var linkTo = {
		pathname: "edit-absen",
		state: {minggu, kelas}
	};

	var present = minggu.muridCount || 0;
	var absent = kelas.muridCount - present;;
	return (
		<tr>
			<td>{toDateString(minggu.tanggal)}</td>
			<td>{present}</td>
			<td>{absent}</td>
			<td><Link to={linkTo}>Edit</Link></td>
		</tr>
	)
}

function ListMinggu(props){
	var {kelas} = props;
	var loader = () => fetch(`/absen/get-list?kelasId=${kelas.id}`)
		.then( res => res.json() )
		.then( list => {
			console.log(list)
			var nextSunday = getNextSunday();
			list.forEach( minggu => {
				minggu.tanggal = new Date(minggu.tanggal);
				if(nextSunday && dateIsEqual(minggu.tanggal, nextSunday)){
					nextSunday = null;
				}
			});

			if(nextSunday) list.unshift({tanggal: nextSunday});
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
	    			{list.map( (data, i) => <Minggu key={i} minggu={data} kelas={kelas}/>)}
	    		</tbody>
	    	</Table>
	    }
	  </DynamicComponent>
	)
}


export default class View extends React.Component {

	getKelasData(){
		return this.props.location.state.data;
	}

	render() {
		var data = this.getKelasData();
		return (
			<div>
				<h3>Absen Horong {data.horong} tahun {data.tahun}</h3>
				<ListMinggu kelas={data}/>
			</div>
		);
	}
}