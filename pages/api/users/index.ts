import { NextApiRequest, NextApiResponse } from "next";
import { getUsers } from "../../../components/apiControllers/users";
import connect from "../../../lib/database";

export default async function HANDLER(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connect();
    if (req.method == "GET") {
      await getUsers(req, res);
    } else {
      res.status(402).send("this method is not allows");
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}
