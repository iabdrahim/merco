import { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/user";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

let getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { page, perpage, email } = req.query;
    let pg = +(page || 1); // Current page number
    let pageSize = +(perpage || 10); // Number of results per page
    let users = await User.find({}, "name email avatar")
      .skip((pg - 1) * pageSize)
      .limit(pageSize);
    return res.status(200).send(users);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
};

let getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let id = req.query.id;
    if (!id) {
      return res.status(401).send("user id is not valid");
    }
    let user;
    try {
      user = await User.findOne(
        { _id: id },
        "phoneNumber name createdAt location avatar"
      );
    } catch (err) {
      return res.status(404).send("no user found");
    }

    return res.status(200).send(user);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
};

let getCurrentUser = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    let session = await getSession(req, res);
    let user = session?.user;
    try {
      if (!user) {
        return res.status(403).send("you are not authenticated");
      }
      let userInDb = await User.findOne({ email: user.email });
      if (!userInDb) {
        let newUser = {
          name: user?.name,
          email: user.email,
          avatar: user.image || (user as any)?.picture || "/user.png",
          username: user?.email?.split("@")[0],
        };
        let userCreated = await User.create(newUser);
        return res.status(200).send(userCreated);
      }
      return res.status(200).send(userInDb);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);
let deleteCurUser = withApiAuthRequired(
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
      let delUser;
      try {
        delUser = await User.findOneAndDelete({ _id: userInDb._id });
      } catch (err) {
        return res.status(404).send(err);
      }
      if (!delUser) {
        return res.status(404).send("user not found");
      }
      return res.status(200).send("user deleted successfully");
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);

let updateCurUser = withApiAuthRequired(
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
      let updatedData = req.body;

      if (!updatedData) {
        return res.status(400).send("user data is required");
      }
      let upuser;
      try {
        upuser = await User.findOneAndUpdate(
          { _id: userInDb._id },
          { $set: updatedData }
        );
      } catch (err) {
        return res.status(404).send(err);
      }
      if (!upuser) {
        return res.status(404).send("This user is not exist");
      }
      return res.status(200).send("user is  updated successfully");
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);

export { getUser, getUsers, getCurrentUser, updateCurUser, deleteCurUser };
