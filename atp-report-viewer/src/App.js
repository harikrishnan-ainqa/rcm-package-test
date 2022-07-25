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
        <StyleContext query={props.query}>
          <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <CenteredTabs 
            projectId={props.projectId} 
            db_name={props.db_name} 
            entiy={props.entiy} 
            URl={props.URl}  
            Report_dbname={props.Report_dbname}
            Report_Entity={props.Report_Entity}
            MetaSampleJson={props.MetaSampleJson}
            Metadata_dbname={props.Metadata_dbname}
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
