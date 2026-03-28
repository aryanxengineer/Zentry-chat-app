import http from "http";

import connectToMongoDB from "@config/mongo.js";
import { PORT } from "@config/env.js";
import app from "./app.js";
import { initializeSocket } from "@lib/socket.js";

const server = http.createServer(app);
initializeSocket(server);

const startServer = async () => {
  await connectToMongoDB();

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

export default server;
