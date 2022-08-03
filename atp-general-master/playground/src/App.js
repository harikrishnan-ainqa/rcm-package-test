import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GeneralMaster } from "atp-general-master";
import "react-toastify/dist/ReactToastify.css";
const App = (props) => {
  let ThemeOptions = {
    palette: {
      type: "light",

      primary: {
        main: "#3f51b5",
      },

      secondary: {
        main: "#f50057",
      },
    },

    typography: {
      fontFamily: [
        "-apple-system",

        "BlinkMacSystemFont",

        '"Segoe UI"',

        '"Helvetica Neue"',

        "Arial",

        "sans-serif",

        '"Apple Color Emoji"',

        '"Segoe UI Emoji"',

        '"Segoe UI Symbol"',
      ].join(","),
    },
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <GeneralMaster
              URl="https://arangodbservice.dev.ainqaplatform.in"
              db_name="ipmo"
              metadataId="8fd7c4c8-706a-4edc-ab27-534cb7e9ad8a"
              metadata_dbname="ATP_Platform_DEV"
              theme={ThemeOptions}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
