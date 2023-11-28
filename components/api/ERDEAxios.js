import axios from "axios";
import urlJoin from "url-join";
import getEnvVars from "../../environment";
import { read } from "../helpers/LocalStorage";
import { locale } from "expo-localization";

const { apiUrl } = getEnvVars();

const DEBUG = true;

const ERDEAxios = axios.create();

// interceptor for outgoing requests
ERDEAxios.interceptors.request.use(
  async (config) => {
    // const userToken = await read("userToken");
    const userToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGZiZTYxMDcxYWYzYWQyMDNkYmE4YjgiLCJkYXRlIjoiMjAyMy0xMS0yMVQxOTo0MTozMy4xODdaIiwiaWF0IjoxNzAwNTk1NjkzfQ.mQg2RC6fN4EpT7hkTdnqGy9PArSapZ7Gl_mkhCBIWFE";
    if (userToken) {
      config.headers["Authorization"] = "Bearer " + userToken;
    }
    config.headers["Accept-Language"] = locale;
    config.headers["Content-type"] = "application/json";
    config.url = urlJoin(apiUrl, config.url);
    if (DEBUG) {
      console.log("URL", config.url);
      config.data && console.log("DATA", config.data);
    }
    return config;
  },
  (error) => {
    if (DEBUG) {
      console.log("API CALL UNSUCCESSFUL");
      console.log(JSON.stringify(error, null, 2));
    }
    return Promise.reject(error);
  }
);

// interceptor for incoming responses
ERDEAxios.interceptors.response.use(
  (response) => {
    const responseString = JSON.stringify(response.data, null, 2);
    if (DEBUG) {
      console.log("API CALL RESPONSE SUCCESSFUL");
    }

    if (response?.status === 200 || response?.status === 201) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    const errorMsg = JSON.stringify(error.message);

    if (DEBUG) {
      console.log("API ERROR", errorMsg);
    }

    if (error?.response?.status) {
      switch (error.response.status) {
        case 400:
          console.log(
            "Bad Request - please check the request parameters for correct configuration",
            errorMsg
          );
          break;
        case 401:
          console.log("Session Expired", errorMsg);
          break;
        case 403:
          console.log(
            "Forbidden - the passed auth params do not have permission to view this resource",
            errorMsg
          );
          break;
        case 404:
          console.log("Not Found", errorMsg);
          break;
        default:
          console.log("Non 400 response error", errorMsg);
      }
      return Promise.reject(error);
    }
  }
);

export default ERDEAxios;
