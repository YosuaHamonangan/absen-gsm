import React from 'react';
import ReactDom from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import routes from './routes';

ReactDom.render(
	<BrowserRouter>
		{routes}
	</BrowserRouter>,
	document.querySelector('#app')
);