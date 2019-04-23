import React from "react";
import { Table } from 'reactstrap';
import DynamicComponent from '../components/dynamic-component';
import { toDateString } from '../utils/date';

function Murid(props){
	var {data} = props;
	return (
		<tr>
			<td>{data.nama} {data.marga}</td>
			<td><input type="radio" name={data.id} value="HADIR"/></td>
			<td><input type="radio" name={data.id} value="ABSEN" defaultChecked/></td>
		</tr>
	)
}

class ListMurid extends React.Component{
	onSubmit(evt){
		evt.preventDefault();
		var data = new FormData(evt.target);
		var muridList = [];
		for(var murid of data.entries()){
			var id = murid[0], status = murid[1];
			if(status === "HADIR") muridList.push(id);
			// data.delete(id);
		}

		var body = new URLSearchParams();
		body.append("tanggal", this.props.minggu.tanggal)
		body.append("kelasId", this.props.kelas.id)
		body.append("murid", JSON.stringify(muridList))

		fetch("/absen/edit", {
			method: "post",
			body
		})
	}

	render(){
		var {kelas} = this.props;
		var loader = () => fetch(`/kelas/getMuridList?kelas=${kelas.id}`).then( res => res.json() );

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
			    			{list.map( (data, i) => <Murid key={i} data={data}/>)}
			    		</tbody>
			    	</Table>
		    	</form>
		    }
		  </DynamicComponent>
		)
	}
}

export default class View extends React.Component {
	getKelasData(){
		return this.props.location.state.kelas;
	}

	getMingguData(){
		return this.props.location.state.minggu;
	}

	render() {
		var minggu = this.getMingguData();
		var kelas = this.getKelasData();
		return (
			<div>
				<h3>Absen Horong {kelas.horong} tahun {kelas.tahun}</h3>
				<h3>{toDateString(minggu.tanggal)}</h3>
				<ListMurid kelas={kelas} minggu={minggu}/>
			</div>
		);
	}
}
