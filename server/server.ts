import express from "express";
import cors from "cors";
import chalk from "chalk";
import fs from "fs";
import { v4 } from "uuid";
import { exec, execSync, spawn, spawnSync } from "child_process";

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use((req, _, next) => {
  try {
    console.log(chalk.redBright(`HIT ${req.path}`));
  } catch (error) {
    console.log(error);
  } finally {
    next();
  }
});

type ImageBody = {
  imageURL?: string;
};

app.post("/v1/image/detect", (req, res) => {
  try {
    const reqBody: ImageBody = req.body;
    if (!reqBody.imageURL) {
      res.status(400).send({
        message: "fail",
        data: "Image didn't exists in request JSON body!",
      });
      return;
    }
    const fileName = v4().slice(0, 6);
    fs.writeFileSync(
      `../images/${fileName}.png`,
      reqBody.imageURL.replace(/^data:image\/\w+;base64,/, ""),
      {
        encoding: "base64",
      }
    );
    console.log("Image Saved");
    const output = execSync(
      `python3 ../python/main.py ../images/${fileName}.png`
    );
    console.log(output.toString());
    res.status(200).send({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "fail", error: error });
  }
});

app.get("/hello", (_, res) => {
  try {
    res.status(200).send({ message: "success", data: "Hello Tiger!" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "fail", error: error });
  }
});

type UserBody = {
  userName: string;
  profileURL: string;
};

app.post("/test/api/something", (req, res) => {
  try {
    const userBody: UserBody = req.body;
    userBody.userName;
    console.log(req.body);
    res.status(200).send({ message: "success", data: req.body });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "fail", error: error });
  }
});

app.listen(PORT, () => {
  if (!fs.existsSync("../images")) {
    fs.mkdirSync("../images");
  }
  console.log(chalk.red(`Server listening to Port: ${PORT}`));
});
