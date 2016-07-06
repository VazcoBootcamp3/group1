import React from 'react';

const ReportSecondaryText = (props) =>
	<p className='report-sn-text'>
	    <strong>Contact: </strong> {props.phone}<br />
	    <strong>Balance: </strong> {props.balance} zł
	</p>;

export default ReportSecondaryText;