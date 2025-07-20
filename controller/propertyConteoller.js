const Property = require("../models/propertySchema");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllProperty = catchAsync(async (req, res) => {
  const features = new APIFeatures(Property.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const property = await features.query;

  if (property === 0) {
    res.status(400).json({
      status: "sucess",
      message: "no property",
    });
  }

  res.status(200).json({
    status: "sucess",
    result: property.length,
    data: {
      property,
    },
  });
});

exports.createProperty = catchAsync(async (req, res) => {
  const newProperty = await Property.create(req.body);
  res.status(201).json({
    status: "sucess",
    data: {
      newProperty,
    },
  });
});

exports.getProperty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const property = await Property.findById(id).populate("ownerId");

  if (!property) {
    return res.status(404).json({
      status: "fails",
      message: "invalis id",
    });
  }
  res.status(200).json({
    status: "sucess",
    data: {
      property,
    },
  });
});

exports.updateProperty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const property = await Property.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!property) {
    return res.status(404).json({
      status: "fails",
      message: "invalis id",
    });
  }
  res.status(200).json({
    status: "sucess",
    data: {
      property,
    },
  });
});

exports.deleteProperty = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const property = await Property.findByIdAndDelete(id);
  if (!property) {
    return next(new AppError(`No property Found. Check the id ${id}`), 401);
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
