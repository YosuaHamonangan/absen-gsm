import React from 'react';
import ReactDom from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import '../../stylesheets/style.css';

ReactDom.render(
	<BrowserRouter>
		{routes}
	</BrowserRouter>,
	document.querySelector('#app')
);