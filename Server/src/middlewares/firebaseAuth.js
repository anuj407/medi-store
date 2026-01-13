import admin from "../config/firebaseAdmin.js";

export const firebaseAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized - token missing" });
    }

    const token = header.split(" ")[1];

    // ✅ verify token
    const decoded = await admin.auth().verifyIdToken(token);

    // attach verified user
    req.auth = decoded; // { uid, email, name, picture, ... }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - invalid token" });
  }
};
