import React, { Component } from "react";
import { Link } from 'react-router-dom';
import DynamicComponent from '../components/dynamic-component';

function Kelas(props){
	var {data} = props;
	var linkTo = {
		pathname: "edit-kelas",
		state: { data }
	}
	return (
		<tr>
			<td>{data.tahun || ""}</td>
			<td>{data.horong || ""}</td>
			<td>BELUM</td>
			<td><Link to={linkTo}>Edit</Link></td>
		</tr>
	)
}

function ListKelas(props){
	var loader = () => fetch("/kelas/get-list").then( res => res.json() );

	return (
	  <DynamicComponent load={loader}>
	    { list => list === null ? 
	    	<p>Loading</p> : 
	    	<table>
	    		<thead>
		    		<tr>
		    			<th>Tahun</th>
		    			<th>Horong</th>
		    			<th>Jumlah Anak</th>
		    		</tr>
	    		</thead>
	    		<tbody>
	    			{list.map( (data, i) => <Kelas key={i} data={data}/>)}
	    		</tbody>
	    	</table>
	    }
	  </DynamicComponent>
	)
}

export default class view extends Component {
	render() {
		return (
			<div>
				List Kelas
				<ListKelas/>
			</div>
		);
	}
}
