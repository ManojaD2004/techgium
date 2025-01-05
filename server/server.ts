import express from "express";
import cors from "cors";
import chalk from "chalk";
import fs from "fs";
import { v4 } from "uuid";

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
      res
        .status(400)
        .send({
          message: "fail",
          data: "Image didn't exists in request JSON body!",
        });
      return;
    }
    fs.writeFileSync(
      `./images/${v4().slice(0, 6)}.png`,
      reqBody.imageURL.replace(/^data:image\/\w+;base64,/, ""),
      {
        encoding: "base64",
      }
    );
    console.log("Image Saved");
    res.status(200).send({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "fail", error: error });
  }
});

app.listen(PORT, () => {
  console.log(chalk.red(`Server listening to Port: ${PORT}`));
});
