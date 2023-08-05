import { NextApiRequest, NextApiResponse } from "next";
import { addAd, getAds } from "../../../components/apiControllers/ads";
import connect from "../../../lib/database";

export default async function HANDLER(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connect();
    if (req.method == "GET") {
      await getAds(req, res);
    } else if (req.method == "POST") {
      await addAd(req, res);
    } else {
      res.status(402).send("this method is not allows");
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).send(err.message);
  }
}
