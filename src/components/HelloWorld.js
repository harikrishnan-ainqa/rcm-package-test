import React from 'react';
import Typography from '@material-ui/core/Typography';


function HelloWorld(props) {
    const {name}=props;
    return <Typography>Hello {name}</Typography>
}

HelloWorld.defaultProps={
    name:"React & Material UI NPM package boilerplate"
}

export default HelloWorld;