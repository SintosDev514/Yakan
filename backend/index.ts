import { connectDb } from "./src/config/database";
import app from "./src/app";
import { createServer } from "http";
import { initializeSocket } from "./src/utils/socket";

const PORT = process.env.PORT || 5000;

const httpserver = createServer();

initializeSocket(httpserver);

try {
  connectDb().then(() => {
    httpserver.listen(PORT, () => {
      console.log("System is Up on:", PORT);
    });
  });
} catch (error) {
  console.error("Error : ", error);
  process.exit(1);
}
