import { NextApiRequest, NextApiResponse } from "next";
import Message from "../../models/chat";
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
      let userInDb = await User.findOne({ email: user.email }, "email");
      if (!userInDb) {
        return res.status(402).send("this user is not in the database");
      }
      let msgs;
      try {
        msgs = await Message.find({
          $or: [{ seller: userInDb._id }, { buyer: userInDb._id }],
        })
          .populate("seller", "name avatar _id phoneNumber")
          .populate("buyer", "name avatar _id phoneNumber")
          .select({
            createdAt: 1,
          });
      } catch (err) {
        return res.status(404).send("This chat is not longer exist");
      }

      return res.status(200).send(msgs);
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
      let userInDb = await User.findOne({ email: user.email }, "email");
      if (!userInDb) {
        return res.status(402).send("this user is not in the database");
      }
      let chatId = req.query.id;
      let msg;
      try {
        msg = await Message.findOne({
          _id: chatId,
          $or: [{ seller: userInDb._id }, { buyer: userInDb._id }],
        })
          .populate("seller", "name avatar _id phoneNumber")
          .populate("buyer", "name avatar _id phoneNumber")
          .select({
            createdAt: 1,
            messages: 1,
          });
      } catch (err) {
        return res.status(404).send("This chat is not found");
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
      let userInDb = await User.findOne({ email: user.email }, "email");
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
          },
          { $set: updateData }
        );
      } catch (err: any) {
        return res.status(404).send(err.message);
      }

      return res.status(200).send(msg);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);

let addChat = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    let session = await getSession(req, res);
    let user = session?.user;
    if (!user) {
      return res.status(400).send("you are not authenticated");
    }
    try {
      let userInDb = await User.findOne({ email: user.email }, "email");
      if (!userInDb) {
        return res.status(402).send("this user is not in the database");
      }
      let MessageData = req.body;
      if (!MessageData) {
        return res.status(401).send("this data is not valid");
      }
      let newMessage = await Message.create({
        ...MessageData,
        buyer: userInDb._id,
      });
      return res.status(200).send(newMessage);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);
let deleteChat = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    let session = await getSession(req, res);
    let user = session?.user;
    if (!user) {
      return res.status(400).send("you are not authenticated");
    }
    try {
      let userInDb = await User.findOne({ email: user.email }, "email");
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
          $or: [{ seller: userInDb._id }, { buyer: userInDb._id }],
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

export { addChat, deleteChat, getChat, getUserChats, updateChat };
