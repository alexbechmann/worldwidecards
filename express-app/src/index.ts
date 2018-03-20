const express = require("express");
const app = express();
import { Request, Response } from "express";

app.get("/", (req: Request, res: Response) => res.send("Hello World!"));

app.listen(3100, () => console.log("Example app listening on port 3100!"));
