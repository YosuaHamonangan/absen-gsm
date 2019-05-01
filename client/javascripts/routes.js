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
		path: "child",
		loader: () => import("./views/child")
	},
	{
		path: "register-child",
		loader: () => import("./views/register-child")
	},
	{
		path: "edit-child",
		loader: () => import("./views/edit-child")
	},
	{
		path: "class",
		loader: () => import("./views/class")
	},
	{
		path: "register-class",
		loader: () => import("./views/register-class")
	},
	{
		path: "edit-class",
		loader: () => import("./views/edit-class")
	},
	{
		path: "week",
		loader: () => import("./views/week")
	},
	{
		path: "edit-week",
		loader: () => import("./views/edit-week")
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
