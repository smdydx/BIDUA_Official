import express from "express";
import { setupVite, serveStatic } from "./vite";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = createServer(app);

(async () => {
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = process.env.PORT || 5000;
  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
})();