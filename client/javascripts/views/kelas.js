import React from "react";
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import DynamicComponent from '../components/dynamic-component';

function Kelas(props){
	var {data} = props;
	var linkEdit = {
		pathname: "/edit-kelas",
		state: { data }
	};

	var linkAbsen = {
		pathname: "/absen",
		state: { data }
	};
	return (
		<tr>
			<td>{data.tahun || ""}</td>
			<td>{data.horong || ""}</td>
			<td>{data.muridCount}<Link to={linkEdit}>Edit</Link></td>
			<td><Link to={linkAbsen}>Absen</Link></td>
		</tr>
	)
}

function ListKelas(props){
	var loader = () => fetch("/kelas/get-list").then( res => res.json() );

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
	    			{list.map( (data, i) => <Kelas key={i} data={data}/>)}
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
				<Link to="/register-kelas">Tambah kelas baru</Link><br/>
				<ListKelas/>
			</div>
		);
	}
}
