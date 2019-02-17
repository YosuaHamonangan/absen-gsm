import React, { Component } from "react";

export default class view extends Component {
	render() {
		return (
			<div>
				<a href="/register-murid">Tambah murid baru</a><br/>
				<a href="/list-murid">Daftar murid yang ada</a><br/>
				<br/>
				<a href="/">Kembali</a><br/>
			</div>
		);
	}
}
