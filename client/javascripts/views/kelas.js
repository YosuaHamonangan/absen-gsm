import React from "react";
import { Link } from 'react-router-dom';
import ListKelas from "../components/list-kelas"

export default class view extends React.Component {
	render() {
		return (
			<div>
				<Link to="/register-kelas">Tambah kelas baru</Link><br/>
				<br/>
				<ListKelas/>
			</div>
		);
	}
}
