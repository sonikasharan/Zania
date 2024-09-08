import { rest } from "msw";
import { initialCardData } from "./testData";

const dataKey = "card-data";
const initialData = initialCardData;
export const handlers = [
  //get data
  rest.get("api/cards", (req, res, ctx) => {
    const localStorageData = localStorage.getItem("card-data") || null;
    const storedData = JSON.parse(
      localStorageData || JSON.stringify(initialData)
    );
    console.log("storedData", storedData);
    return res(ctx.json(storedData));
  }),

  //Update Data
  rest.post("/api/cards", (req, res, ctx) => {
    const newData = req.body;
    localStorage.setItem(dataKey, JSON.stringify(newData));
    return res(ctx.status(200), ctx.json(newData));
  }),
];
