import { connectDb } from "./src/config/database";
import app from "./src/app";

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("System is Up on:", PORT);
  });
});
