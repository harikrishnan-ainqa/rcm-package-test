
 import dotenv from "dotenv";


 dotenv.config();
 
 let  Config = {};

Config.Dbname = process.env.REACT_APP_DBNAME;
Config.Entity = process.env.REACT_APP_ENTITY;
Config.Api_Url = process.env.REACT_APP_API_URL;
Config.reportdbname = process.env.REACT_APP_REPORT_DBNAME;
Config.reportentity = process.env.REACT_APP_REPORT_ENTITY;
Config.query = {
  db_name: "ATP_Metadata_Dev",
  entity: "Report_Viewer",
  return_fields: "Report_Viewer",
};

export default Config;