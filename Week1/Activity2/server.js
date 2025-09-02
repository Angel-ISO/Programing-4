import http from 'http';
import express from 'express';
import mainRoutes from './routes/mainRoutes.js';
import interceptor from './middlewares/interceptor.js';

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(interceptor);

app.use('/', mainRoutes);

server.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
