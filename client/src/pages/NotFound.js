import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (

<div>
<h2> 404 Error </h2>
<h4>We're sorry, the page you're looking for doesnt seem to exist</h4>
<Link to="/">Return to Home Page</Link>
</div>
);
export default NotFound;