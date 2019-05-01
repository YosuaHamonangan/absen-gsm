import React from "react";
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import DynamicComponent from '../components/dynamic-component';

function Child(props){
	var {data} = props;
	var linkTo = {
		pathname: "edit-child",
		state: { data }
	}
	return (
		<tr>
			<td>{data.name || ""}</td>
			<td>{data.surname || ""}</td>
			<td>{data.gender || ""}</td>
			<td>{data.dob || ""}</td>
			<td>{data.phone || ""}</td>
			<td>{data.address || ""}</td>
			<td><Link to={linkTo}>Edit</Link></td>
		</tr>
	)
}

function ListChild(props){
	var loader = () => fetch("/child/get-list").then( res => res.json() );

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
	    			{list.map( (data, i) => <Child key={i} data={data}/>)}
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
				<Link to="/register-child">Tambah murid baru</Link><br/>
				<ListChild/>
			</div>
		);
	}
}
