import { NextApiRequest, NextApiResponse } from "next";
import {
  deleteCurUser,
  getCurrentUser,
  updateCurUser,
} from "../../../components/apiControllers/users";
import connect from "../../../lib/database";

export default async function HANDLER(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connect();
    if (req.method == "GET") {
      await getCurrentUser(req, res);
    } else if (req.method == "DELETE") {
      await deleteCurUser(req, res);
    } else if (req.method == "PUT") {
      await updateCurUser(req, res);
    } else {
      res.status(402).send("This method is not allows");
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}
