import React from "react";
import StyleContent from "./context";
import { NetworkReadCall } from "./utils/network";
import config from "./utils/config";
const StyleContext = (props) => {

  const [styledata, setStyledata] = React.useState([]);
  React.useEffect(() => {
    let res_data = NetworkReadCall(config.query);
    res_data
      .then((res) => setStyledata(res.result[0]))
      .catch((err) => console.error(err));
  }, []);

  console.log(styledata);
  return (
    <StyleContent.Provider value={styledata}>
      {props.children}
    </StyleContent.Provider>
  );
};

export default StyleContext;
