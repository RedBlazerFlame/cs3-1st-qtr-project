import { __awaiter } from "tslib";
import { createServer } from "http";
import express from "express";
import { readFile } from "fs/promises";
const PORT = process.env.PORT || 4000;
const app = express();
const httpServer = createServer(app);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let homePageData = yield readFile("./src/htdocs/index.html", {
            encoding: "utf-8",
        });
        res.send(homePageData);
    }
    catch (_a) {
        console.error("Error: cannot GET /");
    }
}));
app.use(express.static("./src/htdocs"));
app.use(express.static("./src"));
httpServer.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});
