import React, {Component} from "react";
import DynamicComponent from './dynamic-component';

export default function DynamicImport(load){
	var loader = load.loader;
	var loading = load.loading || <p>Loading</p>;

	return function(props){
		return (
		  <DynamicComponent load={loader}>
		    { Component => Component === null ? loading : <Component {...props} /> }
		  </DynamicComponent>
		)
	}
}
