import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";

import { ReportViewer } from "atp-report-viewer";
import "flexmonster/flexmonster.css";
const App = () => {

    const  query = {
        db_name: "ATP_Metadata_Dev",
        entity: "Report_Viewer",
        return_fields: "Report_Viewer",
      }
    return (
        <Switch>
            <Route exact path="/" render={(props) => {
                return (
                    <ReportViewer 
                     projectId="projects/187315907" 
                     db_name="ATP_Metadata_Dev" 
                     entiy="Report_Viewer" 
                     URl="https://arangodbservice.dev.ainqaplatform.in/api/read_documents"
                     Report_dbname="ATP_Platform_DEV"
                     Report_Entity="QDMReports"
                     MetaSampleJson="https://arangodbservice.dev.ainqaplatform.in/api/GetMetaDataSampleJson"
                     Metadata_dbname="ATP_Platform_DEV"
                     query={query}
                         />
                )
            }} />
        </Switch>
    );
}

export default App;
