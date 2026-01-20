import path from "node:path";
import { pathToFileURL } from "node:url";

const viteConfigUrl = pathToFileURL(path.resolve("vite.config.ts")).href;

// Import the Vite config as a real file module (not eval)
import(viteConfigUrl)
  .then(() => console.log("vite.config.ts imported successfully"))
  .catch((err) => {
    console.error("Failed to import vite.config.ts");
    console.error(err);
    process.exit(1);
  });
