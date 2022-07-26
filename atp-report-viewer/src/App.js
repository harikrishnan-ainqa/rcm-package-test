import "./App.css";
import { CenteredTabs } from "./screen";
import Grid  from "@material-ui/core/Grid";
import React from "react";
import StyleContext from "./stylecontext";
import { AlertProvider } from "./Alert.context";
import withTheme from './themeProvider';
import withStyleFix from './stylefix';

const App = (props) => {
  return(
    <>
    <div {...props}>
      <AlertProvider>
        <StyleContext >
          <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <CenteredTabs 
            projectId={props.projectId} 
            />
            </Grid>
          </Grid>
        </StyleContext>
      </AlertProvider>
      </div>
    </>
  );
}

export default withStyleFix(withTheme(App));
