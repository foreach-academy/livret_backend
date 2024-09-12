const User = require("../models/user");


   const getUserByEmail = async (email) =>{
       const user =  await User.findOne({where:{ email }});
       console.log(user)
       return user? user.dataValues : null;
   }

     


module.exports = {getUserByEmail};

