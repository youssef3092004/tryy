// discountUserHotel = require("../models/discount_user_hotel");

// const getDiscountUserHotels = async (req, res, next) => {
//   try {
//     const discountUserHotels = await discountUserHotel.find();
//     if (!discountUserHotels) {
//       res.status(404);
//       throw new Error("There are no discountUserHotels available");
//     }
//     return res.status(200).json(discountUserHotels);
//   } catch (error) {
//     next(error);
//   }
// };

// const getDiscountUserHotel = async (req, res, next) => {
//   try {
//     const discountUserHotel = await discountUserHotel.findById(req.params.id);
//     if (!discountUserHotel) {
//       res.status(404);
//       throw new Error("There is no discountUserHotel by this ID");
//     }
//     return res.status(200).json(discountUserHotel);
//   } catch (error) {
//     next(error);
//   }
// };

// const createDiscountUserHotel = async (req, res, next) => {
//   try {
//     const { discount, user, hotel } = req.body;
//     const newDiscountUserHotel = new discountUserHotel({
//       discount,
//       user,
//       hotel,
//     });
//     if (!discount) {
//       res.status(404);
//       throw new Error("Discount is required");
//     }
//     if (!user) {
//       res.status(404);
//       throw new Error("User is required");
//     }
//     if (!hotel) {
//       res.status(404);
//       throw new Error("Hotel is required");
//     }
//     savedDiscountUserHotel = await newDiscountUserHotel.save();
//     return res.status(200).json(savedDiscountUserHotel);
//   } catch (error) {
//     next(error);
//   }
// };

// const updateDiscountUserHotel = async (req, res, next) => {
//   try {
//     const discountUserHotel = await discountUserHotel.findById(req.params.id);
//     if (!discountUserHotel) {
//       res.status(404);
//       throw new Error("There is no discountUserHotel by this ID");
//     }
//     const { discount, user, hotel } = req.body;
//     discountUserHotel.discount = discount;
//     discountUserHotel.user = user;
//     discountUserHotel.hotel = hotel;
//     updatedDiscountUserHotel = await discountUserHotel.save();
//     return res.status(200).json(updatedDiscountUserHotel);
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteDiscountUserHotel = async (req, res, next) => {
//   try {
//     const discountUserHotel = await discountUserHotel.findById(req.params.id);
//     if (!discountUserHotel) {
//       res.status(404);
//       throw new Error("There is no discountUserHotel by this ID");
//     }
//     await discountUserHotel.remove();
//     return res.status(200).json({ message: "DiscountUserHotel removed" });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   getDiscountUserHotels,
//   getDiscountUserHotel,
//   createDiscountUserHotel,
//   updateDiscountUserHotel,
//   deleteDiscountUserHotel,
// };
