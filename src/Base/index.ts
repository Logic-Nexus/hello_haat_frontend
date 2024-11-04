// export const APIURL = "http://localhost:4000/api/v1";
// // export const APIURL = "https://quick-shop-backend-phiq.onrender.com/api/v1";
// // export const SOCKETURL = "https://quick-shop-backend-phiq.onrender.com";
// export const SOCKETURL = "http://localhost:4000";

const config = {
  development: {
    APIURL: "http://localhost:4000/api/v1",
    SOCKETURL: "http://localhost:4000",
    // APIURL: "https://quick-shop-backend-phiq.onrender.com/api/v1",
    // SOCKETURL: "https://quick-shop-backend-phiq.onrender.com",
  },
  production: {
    APIURL: "https://quick-shop-backend-phiq.onrender.com/api/v1",
    SOCKETURL: "https://quick-shop-backend-phiq.onrender.com",
  },
};

const environment: "development" | "production" =
  process.env.NODE_ENV === "production" ? "production" : "development";

export const APIURL = config[environment].APIURL;
export const SOCKETURL = config[environment].SOCKETURL;
