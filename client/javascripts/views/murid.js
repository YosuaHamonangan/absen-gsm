import React from "react";
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import DynamicComponent from '../components/dynamic-component';

function Murid(props){
	var {data} = props;
	var linkTo = {
		pathname: "edit-murid",
		state: { data }
	}
	return (
		<tr>
			<td>{data.nama || ""}</td>
			<td>{data.marga || ""}</td>
			<td>{data.gender || ""}</td>
			<td>{data.tglLahir || ""}</td>
			<td>{data.noHp || ""}</td>
			<td>{data.alamat || ""}</td>
			<td><Link to={linkTo}>Edit</Link></td>
		</tr>
	)
}

function ListMurid(props){
	var loader = () => fetch("/murid/get-list").then( res => res.json() );

	return (
	  <DynamicComponent load={loader}>
	    { list => list === null ? 
	    	<p>Loading</p> : 
	    	<Table>
	    		<thead>
		    		<tr>
		    			<th>Nama</th>
		    			<th>Marga</th>
		    			<th>Gender</th>
		    			<th>Tanggal Lahir</th>
		    			<th>Hp</th>
		    			<th>Alamat</th>
		    			<th></th>
		    		</tr>
	    		</thead>
	    		<tbody>
	    			{list.map( (data, i) => <Murid key={i} data={data}/>)}
	    		</tbody>
	    	</Table>
	    }
	  </DynamicComponent>
	)
}


export default class view extends React.Component {
	render() {
		return (
			<div>
				<h3>Daftar murid yang ada</h3>
				<Link to="/register-murid">Tambah murid baru</Link><br/>
				<ListMurid/>
			</div>
		);
	}
}
