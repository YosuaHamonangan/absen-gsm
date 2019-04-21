import React from 'react';
import ReactDom from 'react-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
import DynamicImport from './components/dynamic-import';

// Home and default route
var indexRoute = "home";
var defaultRoute = "no-page";

var routeList = [
	{
		path: "home",
		loader: () => import("./views/home")
	},
	{
		path: "murid",
		loader: () => import("./views/murid")
	},
	{
		path: "register-murid",
		loader: () => import("./views/register-murid")
	},
	{
		path: "edit-murid",
		loader: () => import("./views/edit-murid")
	},
	{
		path: "list-murid",
		loader: () => import("./views/list-murid")
	},
	{
		path: "kelas",
		loader: () => import("./views/kelas")
	},
	{
		path: "register-kelas",
		loader: () => import("./views/register-kelas")
	},
	{
		path: "edit-kelas",
		loader: () => import("./views/edit-kelas")
	},
	{
		path: "list-kelas",
		loader: () => import("./views/list-kelas")
	},
	{
		path: "absen",
		loader: () => import("./views/absen")
	},
	{
		path: "no-page",
		loader: () => import("./views/no-page")
	}
];

var indexComponent, defaultComponent;
var routes = routeList.map( route => {
	var component = DynamicImport({ loader: route.loader});
	if(route.path === indexRoute) indexComponent = component;
	if(route.path === defaultRoute) defaultComponent = component;

	return <Route key={route.path}  path={"/" + route.path} component={component}/>;
});

export default (
	<Switch>
		<Route exact path='/' component={indexComponent} />
		{routes}
		<Route path='*' component={defaultComponent} />
	</Switch>
);
