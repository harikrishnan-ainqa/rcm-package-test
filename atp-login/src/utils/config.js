/**
 * @author AUTHOR_NAME
 * @email AUTHOR_EMAIL
 * @create date
 * @modify date
 * @desc All the environment variables are taken from process.env and exported
 * via Config variable.
 */

 import dotenv from "dotenv";

 dotenv.config();
 
 let Config = {};
 
 Config.api_url = process.env.REACT_APP_ARANGO_API;
 Config.keylock_url = process.env.REACT_APP_KEY_CLOCK_API;
 Config.graphql = process.env.REACT_APP_GQL_ENDPOINT;
 Config.dbname = process.env.REACT_APP_DB;
 Config.socket = process.env.REACT_APP_SOCKET;
 Config.metaDataId = process.env.REACT_APP_METADATAID;
 Config.projecName = process.env.REACT_APP_APP_NAME;
 Config.nifiUrl = process.env.REACT_APP_NIFI_API;
 Config.Image_upload_protocal = process.env.REACT_APP_IMAGE_UPLOAD_PROTOCAL
   ? process.env.REACT_APP_IMAGE_UPLOAD_PROTOCAL
   : "https";
 
 Config.Image_upload_host = process.env.REACT_APP_IMAGE_UPLOAD_HOST
   ? process.env.REACT_APP_IMAGE_UPLOAD_HOST
   : "fileupload.dev.ainqaplatform.in";
 
 Config.configration_number = process.env.REACT_APP_CONFIG_NO
   ? process.env.REACT_APP_CONFIG_NO
   : 11;
 
 Config.Image_upload_port = process.env.REACT_APP_IMAGE_UPLOAD_PORT
   ? process.env.REACT_APP_IMAGE_UPLOAD_PORT
   : 443;
 Config.uploadUrl = `${Config.Image_upload_protocal}://${Config.Image_upload_host}:${Config.Image_upload_port}/${Config.dbname}/${Config.configration_number}`;
 Config.downloadUrl = `${Config.Image_upload_protocal}://${Config.Image_upload_host}:${Config.Image_upload_port}/${Config.dbname}/`;
 
 Config.taskanddocument = `${process.env.REACT_APP_TASKANDDOCUMENT}/?metadata_id=${process.env.REACT_APP_TASKANDDOCUMENT_METAID}&token=${process.env.REACT_APP_TASKANDDOCUMENT_TOKEN}&ismicrofrontend=true`;
 
 Config.primaycare = `${process.env.REACT_APP_PRIMARYCARE}?token=${process.env.REACT_APP_PRIMARYCARE_TOKEN}&ismicrofrontend=true`;
 
 Config.printerqueue = `${process.env.REACT_APP_PRINTERQUEUE_URL}/?metadata_id=${process.env.REACT_APP_PRINTER_METADATA_ID}&token=${process.env.REACT_APP_TASKANDDOCUMENT_TOKEN}&ismicrofrontend=true`;
 
 Config.ruleBuilderUiUrl = process.env.REACT_APP_RULEBUILDERURL
   ? process.env.REACT_APP_RULEBUILDERURL
   : "http://164.52.212.67:7062";
 
 Config.TokenApikey = process.env.REACT_APP_LOGIN_API_KEY;
 
 export default Config;
 