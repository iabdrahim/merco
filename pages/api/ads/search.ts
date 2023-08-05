import { NextApiRequest, NextApiResponse } from "next";
import { searchAds } from "../../../components/apiControllers/ads";
import connect from "../../../lib/database";

export default async function HANDLER(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connect();
    if (req.method == "GET") {
      await searchAds(req, res);
    } else {
      res.status(402).send("this method is not allowed");
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}
