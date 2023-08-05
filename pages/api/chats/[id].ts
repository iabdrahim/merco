import { NextApiRequest, NextApiResponse } from "next";
import {
  deleteMessage,
  getChat,
  updateChat,
} from "../../../components/apiControllers/messages";
import connect from "../../../lib/database";

export default async function HANDLER(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connect();
    if (req.method == "GET") {
      await getChat(req, res);
    } else if (req.method == "PUT") {
      await updateChat(req, res);
    } else if (req.method == "DELETE") {
      await deleteMessage(req, res);
    } else {
      res.status(402).send("this method is not allows");
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}
