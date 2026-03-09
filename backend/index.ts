import { connectDb } from "./src/config/database";
import app from "./src/app";

const PORT = process.env.PORT || 5000;

try {
  connectDb().then(() => {
    app.listen(PORT, () => {
      console.log("System is Up on:", PORT);
    });
  });
} catch (error) {
  console.error("Error : ", error);
  process.exit(1);
}
