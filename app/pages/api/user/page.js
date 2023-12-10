import { dbSetup } from "@/app/lib/dbSetup";
import userSchema from "@/app/lib/models/userSchema";

export default async function handler(req, res) {
  await dbSetup(req, res);

  if (req.method === "POST") {
    try {
      const userCreateRes = await userSchema.create({
        ...req.body,
      });

      if (userCreateRes) {
        return res.status(200).send("user has been created!");
      } else {
        return res
          .status(500)
          .send({ error: true, message: "could not create user!" });
      }
    } catch (error) {
      console.log("create user error", error);
      return res.status(500).json({ error: true, message: error });
    }
  }

  if (req.method === "GET") {
    try {
      const userRes = await userSchema.find({});
      return res.status(200).send(userRes);
    } catch (error) {
      console.log("list all users error", error);
      return res.status(500).json({ error: true, message: error });
    }
  }
}
