import React, { Component } from "react";

export default class view extends Component {
	render() {
		return (
			<div>
				<a href="/register-kelas">Tambah kelas baru</a><br/>
				<a href="/list-kelas">Daftar kelas yang ada</a><br/>
				<br/>
				<a href="/">Kembali</a><br/>
			</div>
		);
	}
}
