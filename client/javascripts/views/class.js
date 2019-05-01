import React from "react";
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import DynamicComponent from '../components/dynamic-component';

function Class(props){
	var {data} = props;
	var linkEdit = {
		pathname: "/edit-class",
		state: { data }
	};

	var linkWeek = {
		pathname: "/week",
		state: { data }
	};

	return (
		<tr>
			<td>{data.year || ""}</td>
			<td>{data.grade || ""}</td>
			<td>{data.childCount}<Link to={linkEdit}>Edit</Link></td>
			<td><Link to={linkWeek}>Absen</Link></td>
		</tr>
	)
}

function ListClass(props){
	var loader = () => fetch("/class/get-list").then( res => res.json() );

	return (
	  <DynamicComponent load={loader}>
	    { list => list === null ? 
	    	<p>Loading</p> : 
	    	<Table>
	    		<thead>
		    		<tr>
		    			<th>Tahun</th>
		    			<th>Horong</th>
		    			<th>Jumlah Anak</th>
		    			<th></th>
		    		</tr>
	    		</thead>
	    		<tbody>
	    			{list.map( (data, i) => <Class key={i} data={data}/>)}
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
				<h3>Daftar kelas yang ada</h3>
				<Link to="/register-class">Tambah kelas baru</Link><br/>
				<ListClass/>
			</div>
		);
	}
}
