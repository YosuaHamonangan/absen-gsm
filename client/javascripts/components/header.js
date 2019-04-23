import React from "react";
import { 
	Navbar,
	NavbarBrand, 
	Nav,
	NavItem,
	NavLink } from "reactstrap";
import "../../stylesheets/header.css";

export default class Component extends React.Component {
	render() {
		return (
			<Navbar color="light" light expand="md">
				<NavbarBrand href="/">Sekolah Minggu</NavbarBrand>
				<Nav className="ml-auto" navbar>
					<NavItem>
						<NavLink href="/murid">Murid</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="/kelas">Kelas</NavLink>
					</NavItem>
				</Nav>
			</Navbar>
		);
	}
}
