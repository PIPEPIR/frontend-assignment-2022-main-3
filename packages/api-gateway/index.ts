import express, { application, Application, Request, Response } from "express";
import axios from "axios";
import {
  Restaurant,
  ShortMenu,
  FullMenu,
} from "../web/src/Interfaces/Interfaces";

const cors = require("cors");

const app: Application = express();
export default app
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const baseUrl =
  "https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api";

app.get("/", (req, res) => res.send("LINEMAN Assignment"));

async function getData(url: string): Promise<any> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

app.get("/api/restaurant/:id", async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id;
  const url = `${baseUrl}/restaurants/${id}.json`;
  try {
    const data: Restaurant = await getData(url);
    res.json(data);
    console.log("Restaurant Data Fetched");
  } catch (err) {
    //@ts-ignore
    res.status(404).send('Not found');
  }
});

//Get short
app.get(
  "/api/restaurant/:id/:menu/short",
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const menu: string = req.params.menu;
    const shortUrl: string = `${baseUrl}/restaurants/${id}/menus/${encodeURIComponent(
      menu
    )}/short.json`;
    try {
      const shortData: ShortMenu = await getData(shortUrl);
      res.json(shortData);
      console.log(`Short Menu Data Fetched`);
    } catch (err) {
      //@ts-ignore
      res.status(404).send('Not found');
    }
  }
);

//Get full
app.get(
  "/api/restaurant/:id/:menu/full",
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const menu: string = req.params.menu;
    const fullUrl: string = `${baseUrl}/restaurants/${id}/menus/${encodeURIComponent(
      menu
    )}/full.json`;
    try {
      const fullData: FullMenu = await getData(fullUrl);
      res.json(fullData);
      console.log("Full Menu Data Fetched");
    } catch (err) {
      //@ts-ignore
      res.status(404).send('Not found');
    }
  }
);

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${(error as Error).message}`);
}
