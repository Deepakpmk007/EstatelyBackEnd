const mongoose = require("mongoose");

const propertySchema = mongoose.Schema({
  price: Number,
  term: {
    type: String,
    enum: ["long term", "short term"],
    required: true,
  },
  location: [String],
  address: {
    type: String,
    required: [true, "address must enter!"],
  },
  propertyType: {
    type: String,
    enum: ["rent", "sell"],
  },
  description: String,
  ownerName: {
    type: String,
    required: [true, "name must enter"],
  },
  coverImage: {
    type: String,
    required: [true, "cover image must upload"],
  },
  images: Array,
  type: {
    type: String,
    enum: ["apartement", "house", "commercial"],
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "owner id must enter"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
