const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  profilePic: { type: String },
  fullName: { type: String },
  email: { type: String, unique: true },
  contactNo: { type: Number, unique: true },
  password: { type: String },
  role: { type: String, default: "User" },
  loggedInUserToken: [{ token: { type: String } }],
  forgetPassToken: { type: String },
  forgetPassExpiry: { type: "Date", default: new Date() },
  myCoins: [
    {
      coinId: { type: String },
      image: { type: String },
      symbol: { type: String },
      name: { type: String },
      quantity: { type: Number },
      paymentToken: { type: String },
    },
  ],
  watchlists: [
    {
      watchlist_coinId: { type: String },
      watchlist_image: { type: String },
      watchlist_symbol: { type: String },
      watchlist_name: { type: String },
    },
  ],
  createdAt: { type: "Date", default: new Date() },
  updateAt: { type: "Date", default: new Date() },
});

export default mongoose.models["user"] || mongoose.model("user", userSchema);
