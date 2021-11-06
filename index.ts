import { createServer } from "http";
import express from "express";
import { readFile } from "fs/promises";

// Declaring Global Variables and Constants
const PORT = process.env.PORT || 4000;
const ROOT_FOLDER_DIR_NAME = "PotassiumDeVera1stQtrProj";

// Creating Express Server
const app = express();
const httpServer = createServer(app);

app.get("/", async (req, res) => {
    try {
        let homePageData = await readFile(
            `./${ROOT_FOLDER_DIR_NAME}/htdocs/index.html`,
            {
                encoding: "utf-8",
            }
        );
        res.send(homePageData);
    } catch {
        console.error("Error: cannot GET /");
    }
});

app.use(express.static(`./${ROOT_FOLDER_DIR_NAME}/htdocs`));

app.use(express.static(`./${ROOT_FOLDER_DIR_NAME}`));

// Listening to the Specified Port
httpServer.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});
