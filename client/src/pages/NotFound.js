import React from 'react';
import { Button } from 'react-router-dom';

const NotFound = () => (

<div>
<h2> 404 Error </h2>
<h4>We're sorry, the page you're looking for doesnt seem to exist</h4>
<Button to="/">Return to Home Page</Button>
</div>
);
export default NotFound;