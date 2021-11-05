var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createServer } from "http";
import express from "express";
import { readFile } from "fs/promises";
const PORT = process.env.PORT || 4000;
const ROOT_FOLDER_DIR_NAME = "PotassiumDeVera1stQtrProj";
const app = express();
const httpServer = createServer(app);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let homePageData = yield readFile(`./${ROOT_FOLDER_DIR_NAME}/htdocs/index.html`, {
            encoding: "utf-8",
        });
        res.send(homePageData);
    }
    catch (_a) {
        console.error("Error: cannot GET /");
    }
}));
app.use(express.static(`./${ROOT_FOLDER_DIR_NAME}/htdocs`));
app.use(express.static(`./${ROOT_FOLDER_DIR_NAME}`));
httpServer.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});
