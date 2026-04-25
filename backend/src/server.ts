import http from 'http';
import app from '@/app';
import { checkEnv, env } from '@/config/env';

const port = env.port;

const server = http.createServer(app);

server.listen(port, () => {
  checkEnv()
  console.log(`Server is running on port ${port}`);
});
