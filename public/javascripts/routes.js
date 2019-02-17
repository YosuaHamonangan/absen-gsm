import React from 'react';
import ReactDom from 'react-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
import DynamicImport from './components/dynamic-import';

// Home and default route
import indexComponent from "./views/home";
import defaultRoute from "./views/no-page";

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
	// {
	// 	path: "list-kelas",
	// 	loader: () => import("./views/list-kelas")
	// },
	{
		path: "absen",
		loader: () => import("./views/absen")
	},
];

var routes = routeList.map( route => {
	var component = DynamicImport({ loader: route.loader});
	if(route.path === defaultRoute) defaultRoute = component;

	return <Route key={route.path}  path={"/" + route.path} component={component}/>;
});

export default (
	<Switch>
		<Route exact path='/' component={indexComponent} />
		{routes}
		<Route path='*' component={defaultRoute} />
	</Switch>
);