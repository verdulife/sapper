export async function get(req, res, next) {
  try {
    res.json({ message: "👋" });
  } catch (error) {
    next(error);
  }
}
