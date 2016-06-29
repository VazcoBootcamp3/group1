import React from 'react';

// material-ui
import CircularProgress from 'material-ui/CircularProgress';

const LoadingComponent = () =>
	<div className="loading-box">
		<div className="loading-circle"><CircularProgress size={2} /></div>
		<h1>Loading...</h1>
		<h2>If you see this too long, refresh the page.</h2>
	</div>;

export default LoadingComponent;