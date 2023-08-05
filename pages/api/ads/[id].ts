import { NextApiRequest, NextApiResponse } from "next";
import {
  deleteAd,
  getAd,
  updateAd,
} from "../../../components/apiControllers/ads";
import connect from "../../../lib/database";

export default async function HANDLER(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connect();
    if (req.method == "GET") {
      await getAd(req, res);
    } else if (req.method == "PUT") {
      await updateAd(req, res);
    } else if (req.method == "DELETE") {
      await deleteAd(req, res);
    } else {
      res.status(402).send("this method is not allows");
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}
