import { Users } from "../_helpers/db";

export async function get(req, res, next) {
  try {
    const { _id } = req.params;
    const verified = await Users.findOneAndUpdate({ _id }, {
      $set: { verified_email: true }
    });

    if (!verified) throw new Error("email verification has expired");

    res.json({ verification: true })
  } catch (error) {
    next(error);
  }
}
