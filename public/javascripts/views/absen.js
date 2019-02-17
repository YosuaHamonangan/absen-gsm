import React, { Component } from "react";
import DynamicComponent from '../components/dynamic-component';

function Kelas(props){
	var {data, onSelect} = props;
	function onClick(evt){
		evt.preventDefault();
		onSelect(data);
	} 
	return (
		<a href="" onClick={onClick}>
			tahun {data.tahun} horong {data.horong}
		</a>
	)
}

function ListKelas(props){
	var loader = () => fetch("/kelas/getList").then( res => res.json() );

	return (
	  <DynamicComponent load={loader}>
	    { list => list === null ? 
	    	<p>Loading</p> : 
	    	<div>
	    		{list.map( (data, i) => <Kelas key={i} onSelect={props.onSelect} data={data}/>)}
	    	</div>
	    }
	  </DynamicComponent>
	)
}

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

class ListMurid extends Component{
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
		body.append("tanggal", new Date().toISOString())
		body.append("kelas", this.props.kelas.id)
		body.append("muridHadir", JSON.stringify(muridList))

		fetch("/kelas/absen", {
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
		    		Horong {kelas.horong} Tahun {kelas.tahun}
		    		<table>
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
			    	</table>
			    	<input type="submit" value="submit"/>
		    	</form>
		    }
		  </DynamicComponent>
		)
	}
}

export default class view extends Component {
	constructor(props){
		super(props);

		this.state = {
			selected: null
		}
	}

	onSelect(selected){
		this.setState({selected})
	}

	render() {
		return (
			this.state.selected ?
				<div>
					<ListMurid kelas={this.state.selected}/>
				</div>
				: 
				<div>
					kelas:
					<ListKelas onSelect={this.onSelect.bind(this)}/>
				</div>
		);
	}
}
