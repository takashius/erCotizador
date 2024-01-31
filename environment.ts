import Constants from "expo-constants";

const ENV = {
  dev: {
    apiUrl: "http://192.168.0.136:8080",
    type: "dev",
  },
  staging: {
    apiUrl: "https://cotizador-dev-tdrr.4.us-1.fl0.io",
    type: "staging",
  },
  prod: {
    apiUrl: "https://cotizador-dev-tdrr.4.us-1.fl0.io",
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
