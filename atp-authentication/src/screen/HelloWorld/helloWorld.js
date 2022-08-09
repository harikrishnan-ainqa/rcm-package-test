import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyleFix from '../../stylefix';
import withTheme from '../../themeProvider';
import { useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const HelloWorld = (props) => {
    const theme = useTheme();
    const { name } = props;

    return (
        <Container disableGutters maxWidth="lg" style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
            <Typography variant="h2" style={{ color: theme?.palette?.primary?.main, textAlign: "center", fontWeight: 500 }}>Hello {name}</Typography>
        </Container>
    )
}


HelloWorld.defaultProps = {
    name: "React & Material UI NPM package boilerplate"
}

export default withStyleFix(withTheme(HelloWorld));