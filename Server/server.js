import initApp from "./app.js";
import http from 'http';
import https from 'https';
import fs from 'fs'

initApp().then((app) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('DEVELOPMENT');
    http.createServer(app).listen(process.env.DEV_PORT);
    console.log(`Server is running on port: ${process.env.DEV_PORT}`);
  } else {
    console.log('PRODUCTION');
    const options = {
      key: fs.readFileSync("./client-key.pem"),
      cert: fs.readFileSync("./client-cert.pem")
    }
    https.createServer(options, app).listen(process.env.PROD_PORT, "0.0.0.0");
    console.log(`Server is running on port: ${process.env.PROD_PORT}`);
  }
});
