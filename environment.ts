import Constants from "expo-constants";

const ENV = {
  dev: {
    apiUrl: "http://192.168.123.34:8080",
    type: "dev",
  },
  prod: {
    apiUrl: "https://orca-app-ts78d.ondigitalocean.app",
    type: "production",
  },
};

const getEnvVars = (env = Constants.expoConfig) => {
  // if (__DEV__) {
  //   return ENV.dev;
  // } else if (env === 'staging') {
  //   return ENV.staging;
  // } else if (env === 'production') {
  //   return ENV.prod;
  // } else {
  //   return ENV.staging;
  // }
  return ENV.prod;
};

export default getEnvVars;
