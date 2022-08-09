
 import dotenv from "dotenv";

 dotenv.config();
 
let  Config = {};

Config.Api_Url = process.env.REACT_APP_NIFI_API;

export default Config;