const AuthModel = require("../models/Auth.model")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const {sendMail} = require('../plugins/EmailEngine');
const StringModel = require("../models/String.model");

const saltRounds = 10;


async function createUser(req,res,next){
    const user = req.body
    
    const matchedUser = await AuthModel.findOne({email:user.email})
    if(matchedUser){
        return res.status(401).json({
            success:false,
            message:"user already exists. try signin instead"
        })
    }else{
        try {
            const hash = await bcrypt.hash(user.password, saltRounds);
                // Store hash in your password DB.
                if(hash){
                    user.password = hash
                    
                }
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"provided password is not valid",
                error:err
            })
        }
        AuthModel.create(user).then((response)=>{
            if(response._id){
                sendMail("sharan1241@gmail.com",req.body.email,"regarding signup activity in your BookMyShow Account","signup successfull",`your signup is successful`)
            .then((response)=>{console.log(response)})
            .catch((error)=>{console.log(error)})
                return res.status(200).json({
                    success:true,
                    message:"user created successfully",
                    data:response
                })
            }
        }).catch((error)=>{
            return res.status(400).json({
                success:false,
                message:"something went wrong",
                error:error.message
            })
        })
    }

    
}

async function emailVerification(req,res,next){
    const user = req.body
    console.log(user)
    if(!user.email){
        return res.status(401).json({
            success:false,
            error:"invalid credentials",
            message:"email is wrong"
        })
    }else{
        var matchedUser = await AuthModel.findOne({email:user.email})
        if(!matchedUser){
            return res.status(401).json({
                success:false,
                message:"no user exist. try with right credentials"
            })
        }
            var token = jwt.sign({roles:matchedUser.roles}, process.env.NODE_JWT_TOKEN_KEY,{ expiresIn: 60*60*60 });
            console.log(matchedUser.roles)
            function makeid(length) {
                let result = '';
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                const charactersLength = characters.length;
                let counter = 0;
                while (counter < length) {
                  result += characters.charAt(Math.floor(Math.random() * charactersLength));
                  counter += 1;
                }
                return result;
            }
            
            const key = makeid(5)
                const html = `<a href="https://655af38f3b891444f4e542c1--radiant-lollipop-c70905.netlify.app/verify/${key}">${key}</a>`
            sendMail("sharan1241@gmail.com",req.body.email,"regarding login activity in your BookMyShow Account","login successfull",html
            )
            .then((response)=>{console.log(response)})
            .catch((error)=>{console.log(error)})
            const make = {
                "String":key
            }
            StringModel.create(make).then((response)=>{console.log(response)}).catch((err)=>{console.log(err)})
            return res.status(200).json({
                success:true,
                message:"Login successful",
                refreshToken:token
            })
        
    }
}
async function resetPassword(req,res,next){
    const key = req.params
    const user = req.body
    const {pass} = req.body
    console.log(pass)
    console.log(user)
    console.log(key)
    if(!user.pass||!user.email){
        return res.status(401).json({
            success:false,
            error:"invalid credentials",
            message:"email or password is wrong"
        })
        }
        try {
            const hash = await bcrypt.hash(user.pass, saltRounds);
                // Store hash in your password DB.
                if(hash){
                    user.pass = hash
                    
                }
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"provided password is not valid",
                error:err
            })
        }
        const matchedUser = await AuthModel.updateOne({email:user.email},{password:user.pass})
        console.log(matchedUser)
        var token = jwt.sign({roles:matchedUser.roles}, process.env.NODE_JWT_TOKEN_KEY,{ expiresIn: 60*60*60 });
            console.log(matchedUser.roles)
            return res.status(200).json({
                success:true,
                message:"Login successful",
                refreshToken:token
            })
}

async function verify(req,res,next){
    const user = req.body
    console.log(user.key)
    var matchedString = await StringModel.findOne({String:user.key})
    console.log(matchedString)
    if(!matchedString){
        return res.status(400).json({
            success:false,
            message:"keys do not match",
        })
    }else{
        
        var deleteString = await StringModel.deleteMany({String:user.key})
        console.log(deleteString)
        var token = jwt.sign({roles:['user']}, process.env.NODE_JWT_TOKEN_KEY,{ expiresIn: 60*60*60 });
        return res.status(200).json({
            success:true,
            message:"keys match successful",
        })
        
    }
}

module.exports = {
    createUser,
    emailVerification,
    resetPassword,
    verify
}