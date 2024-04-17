const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        email:{
            type: 'String',
            trim: true
        },
        name:{
            type: 'String'
        },
        phoneNumber:{
            type: 'String'
        },
        address:{
            address:{
                type: String
            },
        houseNo:{
            type: String
        },
        area:{
            type: String
        },
        landmark:{
            type: String
        }   
        },
        role:{
            type: 'String',
            default: "customer"
        },
        otp:{
            type:'String'
        },
        token:{
            type: 'String'
        }
    }
);

const user = mongoose.model("user",userSchema);
module.exports = user;