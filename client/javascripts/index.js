import React from 'react';
import ReactDom from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import Header from './components/header'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/style.css';

ReactDom.render(
	(
		<div>
			<Header/>
			<BrowserRouter>
				{routes}
			</BrowserRouter>
		</div>
	),
	document.querySelector('#app')
);