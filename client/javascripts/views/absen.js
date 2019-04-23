import React from "react";
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import DynamicComponent from '../components/dynamic-component';

function Minggu(props){
	var {minggu, kelas} = props;
	var linkTo = {
		pathname: "edit-absen",
		state: {minggu, kelas}
	}
	return (
		<tr>
			<td>{minggu.tanggal}</td>
			<td>hadir belum</td>
			<td>absen belum</td>
			<td><Link to={linkTo}>Edit</Link></td>
		</tr>
	)
}

function ListMinggu(props){
	// var loader = () => fetch("/kelas/get-list").then( res => res.json() );
	var loader = () => Promise.resolve([{tanggal: "23 april 2019"}, {tanggal: "30 april 2019", }]);

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
	    			{list.map( (data, i) => <Minggu key={i} minggu={data} kelas={props.kelas}/>)}
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