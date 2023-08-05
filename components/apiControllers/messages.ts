import { NextApiRequest, NextApiResponse } from "next";
import Message from "../../models/message";
import User from "../../models/user";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

let getUserChats = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    let session = await getSession(req, res);
    let user = session?.user;
    if (!user) {
      return res.status(400).send("you are not authenticated");
    }
    try {
      let userInDb = await User.findOne({ email: user.email });
      if (!userInDb) {
        return res.status(402).send("this user is not in the database");
      }
      let msg;
      try {
        msg = await Message.find({
          $or: [{ sellerId: userInDb._id }, { buyerId: userInDb._id }],
        }).select({
          seller: { name: 1, avatar: 1 },
          buyer: { name: 1, avatar: 1 },
        });
      } catch (err) {
        return res.status(404).send("nothing found");
      }
      if (!msg) {
        return res.status(404).send("nothing found");
      }
      return res.status(200).send(msg);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);

// get chat messages
let getChat = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    let session = await getSession(req, res);
    let user = session?.user;
    if (!user) {
      return res.status(400).send("you are not authenticated");
    }
    try {
      let userInDb = await User.findOne({ email: user.email });
      if (!userInDb) {
        return res.status(402).send("this user is not in the database");
      }
      let chatId = req.query.id;
      let msg;
      try {
        msg = await Message.findOne({
          _id: chatId,
          $or: [{ sellerId: userInDb._id }, { buyerId: userInDb._id }],
        }).select("seller buyer messages createdAt");
      } catch (err) {
        return res.status(404).send("nothing found");
      }
      if (!msg) {
        return res.status(404).send("nothing found");
      }
      return res.status(200).send(msg);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);
let updateChat = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    let session = await getSession(req, res);
    let user = session?.user;
    if (!user) {
      return res.status(400).send("you are not authenticated");
    }
    try {
      let userInDb = await User.findOne({ email: user.email });
      if (!userInDb) {
        return res.status(402).send("this user is not in the database");
      }
      let chatId = req.query.id;
      let updateData = req.body;
      let msg;
      try {
        msg = await Message.findByIdAndUpdate(
          {
            _id: chatId,
            $or: [{ sellerId: userInDb._id }, { buyerId: userInDb._id }],
          },
          { $set: { ...updateData } }
        );
      } catch (err) {
        return res.status(404).send("nothing found");
      }
      if (!msg) {
        return res.status(404).send("nothing found");
      }
      return res.status(200).send(msg);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);

let addMessage = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    let session = await getSession(req, res);
    let user = session?.user;
    if (!user) {
      return res.status(400).send("you are not authenticated");
    }
    try {
      let userInDb = await User.findOne({ email: user.email });
      if (!userInDb) {
        return res.status(402).send("this user is not in the database");
      }
      let MessageData = req.body;
      if (!MessageData) {
        return res.status(401).send("this data is not valid");
      }
      let newMessage = await Message.create({
        ...MessageData,
        buyerId: userInDb._id,
        buyer: userInDb._id,
      });
      return res.status(200).send(newMessage);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);
let deleteMessage = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    let session = await getSession(req, res);
    let user = session?.user;
    if (!user) {
      return res.status(400).send("you are not authenticated");
    }
    try {
      let userInDb = await User.findOne({ email: user.email });
      if (!userInDb) {
        return res.status(402).send("this user is not in the database");
      }
      let id = req.query.id;
      if (!id) {
        return res.status(400).send("chat id is required");
      }
      try {
        await Message.findOneAndDelete({
          _id: id,
          $or: [{ sellerId: userInDb._id }, { buyerId: userInDb._id }],
        });
      } catch (err) {
        return res.status(404).send(err);
      }
      return res.status(200).send("chat is deleted successfully");
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);

export { addMessage, deleteMessage, getChat, getUserChats, updateChat };
