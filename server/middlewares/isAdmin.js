// const Users = require("../models/UserModel");
//
// const isAdmin = async (req, res, next) => {
//     try {
//         let user = await Users.findOne({ isAdmin });
//         if (req.user && user.isAdmin === true) {
//             return next();
//         }
//     } catch (err) {
//         return res.status(401).send({ msg: "Admin token is not valid" });
//     }
// };
//
//
// module.exports = {
//     isAdmin
// }
