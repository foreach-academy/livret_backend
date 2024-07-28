const { DATE } = require('sequelize');
const User = require('../Models/user');
const AuthenticateService = require('../Services/authenticateService');
const bcrypt = require('bcrypt');


const register = async (req, res) =>{
    try{
        const { email, password, promo, role_id, company, prenom, surname,} = req.body;
        console.log(User);
        
        const data = {
            first_name: prenom,
            surname: surname,
            promo: promo,
            email: email,
            password: password,
            created_at: new DATE(),
            updated_at: new DATE(),
            company: company,
            role_id: role_id
        }
        const user = await User.create(data);
        res.status(201).json({message:" Registration succeeded", user});

    }catch(error){
        res.status(401).json({error:" registration not working"})
    }
}

    const  login = async (req, res) =>{

        try {
            const { email, password } = req.body;

             if(!email || !password){
               return res.status(400).json({error: "Authentication failed"});
             }
        const user = await AuthenticateService.getUserByEmail(email);

          const mdpMatch = await bcrypt.compare(password, user.password); 

         if(!user || !mdpMatch){
            return res.status(401).json({error: "Invalid email or password"});
        }
        
         return res.status(200).json({message: "Login successfull", user});

        }catch(error){
            res.status(500).json({error: "error internal"});
        }

    };


module.exports = {login, register};