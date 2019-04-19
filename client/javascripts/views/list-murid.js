import React, { Component } from "react";
import DynamicComponent from '../components/dynamic-component';

function Murid(props){
	var {data} = props;
	return (
		<tr>
			<td>{data.nama || ""}</td>
			<td>{data.marga || ""}</td>
			<td>{data.gender || ""}</td>
			<td>{data.tglLahir || ""}</td>
			<td>{data.noHp || ""}</td>
			<td>{data.alamat || ""}</td>
		</tr>
	)
}

function ListMurid(props){
	var loader = () => fetch("/murid/getList").then( res => res.json() );

	return (
	  <DynamicComponent load={loader}>
	    { list => list === null ? 
	    	<p>Loading</p> : 
	    	<table>
	    		<thead>
		    		<tr>
		    			<th>Nama</th>
		    			<th>Marga</th>
		    			<th>Gender</th>
		    			<th>Tanggal Lahir</th>
		    			<th>Hp</th>
		    			<th>Alamat</th>
		    		</tr>
	    		</thead>
	    		<tbody>
	    			{list.map( (data, i) => <Murid key={i} data={data}/>)}
	    		</tbody>
	    	</table>
	    }
	  </DynamicComponent>
	)
}

fetch("/murid/getList").then( res => res.json() )
.then( a => console.log(a));


export default class view extends Component {
	render() {
		return (
			<div>
				list murid
				<ListMurid/>
			</div>
		);
	}
}
