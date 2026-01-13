import User from "../models/userModel.js";

export const loadDbUser = async (req, res, next) => {
  try {
    const firebaseUid = req.auth.uid;

    let user = await User.findOne({ firebaseUid });

    // ✅ auto create user if first login
    if (!user) {
      user = await User.create({
        firebaseUid,
        email: req.auth.email || "",
        name: req.auth.name || req.auth.email?.split("@")[0] || "User",
        profile: req.auth.picture || "",
        role: "user",
      });
    }

    // ✅ block handling (future-proof)
    if (user.isBlocked) {
      return res.status(403).json({ message: "Account blocked" });
    }

    req.dbUser = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error loading user", error: error.message });
  }
};
