import { NextRequest, NextResponse } from "next/server";
import Ad from "../../models/ad";
import User from "../../models/user";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

let getAds = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { fields, page, perpage } = req.query;

    let pg = +(page || 1); // Current page number
    let pageSize = +(perpage || 12); // Number of results per page
    let ads = Ad.find({})
      .skip((pg - 1) * pageSize)
      .limit(pageSize)
      .sort("-createdAt");

    if (fields) {
      let fieldsList = (fields as string).split(",").join(" ");
      ads = ads.select(fieldsList);
    }

    let resultes = await ads;
    return res.status(200).send(resultes);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
};

let searchAds = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let {
      page,
      sort,
      perpage,
      q,
      fields,
      catagorie,
      tags,
      priceRange,
      city,
      userId,
      ids,
    } = req.query;
    let pg = Number(page) || 1; // Current page number
    let pageLen = +(perpage || 12); // Number of results per page
    let queryObject: any = {};
    if (q) {
      queryObject.title = { $regex: q, $options: "i" };
    }
    if (catagorie) {
      queryObject.catagorie = catagorie;
    }
    if (userId) {
      queryObject.author = userId;
    }
    if (city) {
      queryObject.city = city;
    }
    if (ids) {
      let idis = (ids as string).split(",");
      let ads = await Ad.find({ _id: { $in: idis } });
      return res.status(200).send(ads);
    }
    let ads = Ad.find(queryObject)
      .skip((pg - 1) * pageLen)
      .limit(pageLen);
    if (priceRange) {
      let [min, max] = (priceRange as string).split("-");
      if (!(min == "0" && max == "0") && max > min)
        ads.where("price").gte(Number(min)).lte(Number(max));
    }
    if (sort) {
      let sortList = (sort as string).split(",").join(" ");
      ads = ads.sort(sortList);
    } else {
      ads = ads.sort("-createdAt");
    }
    if (tags) {
      let tagsList = (tags as string).split(",");
      ads = ads.where("tags").in(tagsList);
    }

    if (fields) {
      let fieldsList = (fields as string).split(",").join(" ");
      ads = ads.select(fieldsList);
    }
    let resultes = await ads;
    return res.status(200).send(resultes);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
};
let getAd = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { id } = req.query;
    if (!id) {
      return res.status(402).send("The ad id is required");
    }
    let ad;
    try {
      ad = await Ad.findOne({ _id: id }).populate(
        "author",
        "phoneNumber name _id avatar location"
      );
    } catch (err) {
      return res.status(404).send("this ad is not found");
    }
    if (!ad) {
      return res.status(404).send("this ad is not found");
    }
    return res.status(200).send(ad);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
};

let addAd = withApiAuthRequired(
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
      let AdData = req.body;
      if (!userInDb) {
        return res
          .status(403)
          .redirect("/users/profile")
          .send("your account is not in the database, please try again !");
      }
      if (!AdData) {
        return res.status(401).send("this data is not valid");
      }
      let newAd = new Ad({
        ...AdData,
        author: userInDb._id,
      });
      await newAd.save();
      return res.status(200).send(newAd);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);
let deleteAd = withApiAuthRequired(
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
        return res.status(400).send("ad id is required");
      }
      try {
        await Ad.findOneAndDelete({ _id: id, author: userInDb._id });
      } catch (err) {
        return res.status(404).send("ad is not found");
      }

      return res.status(200).send("ad is deleted successfully");
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);

let updateAd = withApiAuthRequired(
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
      let updatedData = req.body;

      if (!id || !updatedData) {
        return res.status(400).send("ad data is required");
      }

      let ad;
      try {
        ad = await Ad.findOneAndUpdate(
          { _id: id, author: userInDb._id },
          { $set: updatedData }
        );
      } catch (err) {
        return res.status(404).send(err);
      }
      if (!ad) {
        return res.status(404).send("Ad not found");
      }
      return res.status(200).send("ad updated successfully");
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);

export { getAds, getAd, deleteAd, updateAd, addAd, searchAds };
