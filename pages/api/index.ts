import { NextApiRequest, NextApiResponse } from "next";
import { getAds } from "../../components/apiControllers/ads";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default async function HANDLER(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).send("hello client");
}
