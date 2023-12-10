import { dbSetup } from "@/app/lib/dbSetup";
import userSchema from "@/app/lib/models/userSchema";
import { isObjectIdOrHexString } from "mongoose";

export default async function handler(req, res) {
  await dbSetup(req, res);
  const { userID } = req.query;

  if (userID && isObjectIdOrHexString(userID)) {
    if (req.method === "GET") {
      try {
        const userDetails = await userSchema.findOne({
          _id: userID,
        });

        if (userDetails) {
          return res.status(200).send({ data: userDetails });
        } else {
          return res.status(500).send({
            error: true,
            message: "Could not get the user details!",
          });
        }
      } catch (error) {
        console.log("get user details by id error", error);
        return res.status(500).json({ error: true, message: error });
      }
    }

    if (req.method === "PUT") {
      try {
        const updateuserRes = await userSchema.findByIdAndUpdate(
          userID,
          {
            $set: {
              ...req.body,
              updateAt: new Date(Date.now()).toISOString(),
            },
          },
          {
            new: true,
            reunValidators: true,
            useFindAndModify: false,
          }
        );

        if (updateuserRes) {
          return res.status(200).json({
            msg: "user details has been updated!",
            res: updateuserRes,
          });
        }
      } catch (error) {
        console.log("get user details by id and Update error", error);
        return res.status(500).json({ error: true, message: error });
      }
    }

    if (req.method === "DELETE") {
      try {
        const deleteuserRes = await userSchema.findByIdAndDelete(userID);
        if (deleteuserRes) {
          return res.status(200).send("user has been deleted!");
        } else {
          return res
            .status(500)
            .send({ error: true, message: "Could not delete user!" });
        }
      } catch (error) {
        console.log("get user by id and delete error", error);
        return res.status(500).json({ error: true, message: error });
      }
    }
  } else {
    return res.status(500).send({ error: true, message: "Invalid user id!" });
  }
}
