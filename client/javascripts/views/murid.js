import React from "react";
import { Link } from 'react-router-dom';
import ListMurid from "../components/list-murid"

export default class view extends React.Component {
	render() {
		return (
			<div>
				<Link to="/register-murid">Tambah murid baru</Link><br/>
				<br/>
				<ListMurid/>
			</div>
		);
	}
}
