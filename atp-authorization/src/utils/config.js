
 import dotenv from "dotenv";

 dotenv.config();
 
let  Config = {};

Config.Api_Url = process.env.REACT_APP_API_URL;


export default Config;