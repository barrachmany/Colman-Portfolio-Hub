import initApp from "./app.js";
import http from 'http';

initApp().then((app) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('DEVELOPMENT');
    http.createServer(app).listen(process.env.DEV_PORT,"0.0.0.0");
    console.log(`Server is running on port: ${process.env.DEV_PORT}`);
  } else {
    console.log('PRODUCTION');
    http.createServer(app).listen(process.env.PROD_PORT);
    console.log(`Server is running on port: ${process.env.PROD_PORT}`);
  }
});
