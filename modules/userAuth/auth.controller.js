const UserModel = require('./user.model');
const {sendResponse} = require('../../helpers/requesthandler.helper');
const { generateJwt } = require('../../helpers/jwt.helper');
const sendEmail = require('../../helpers/mail.helper');



exports.register = async (req, res, next) => {
    try {

        let subject, message, otp;
        const checkUser = await UserModel.findOne({ email: req.body.email });
        if (checkUser)
            return sendResponse(res, true, 400, "Email already exists");

        let saveUser = await UserModel.create(req.body);

        otp = await generateOTP();
        subject = "Here is your 6 digit OTP";
        message = otp;
        await UserModel.updateOne({ _id: saveUser._id }, { $set: { otp: otp } });
        sendEmail(saveUser.email, subject, message);
        return sendResponse(res, true, 200, "OTP sent successfully", saveUser);
    } catch (error) {
        console.log(error);
    }

};

exports.login = async(req, res) => {
    try{
        let subject, message, otp;
        const getUser = await UserModel.findOne({email: req.body.email});
        if(!getUser) return sendResponse(res, true, 400, "User not found");


        let token = await generateJwt({
            userId: getUser._id,
            email: getUser.email,
            phoneNumber: getUser.phoneNumber
        });

        if(token == undefined) return (res, true, 400, "something went wrong try again");
        otp = generateOTP();
        message = "Here is 6 digits OTP";
        messaage = otp;
        await UserModel.updateOne({_id:getUser._id},{$set:{otp:otp}});
        sendEmail(getUser.email, subject, message,);

        return sendResponse(res, true, 200, "OTP sent successfully",getUser,token);

    }catch(error){
        console.log(error);
    }
};



exports.sentOtp = async (req, res) => {
    try {
        let subject, message;
        let getUser = await UserModel.findById(req.body.userId);
        if (!getUser) return sendResponse(res, true, 400, "User not found.");
        if (req.body.type === 'resendOtp') {
            subject = "Here is your 6 digit OTP";
            otp = await generateOTP();
            message = otp;
            sendEmail(getUser.email, subject, message);
            await UserModel.updateOne({ _id: getUser._id }, { $set: { otp: otp } });
            return sendResponse(res, true, 200, "OTP sent successfully");
        }

        const checkOtp = await UserModel.findOne({
            _id: req.body.userId,
            otp: req.body.otp
        })
        if (!checkOtp)
            return sendResponse(res, true, 400, "Inavild OTP");
        await UserModel.updateOne({ _id: checkOtp._id }, { $set: { status: true } });
        return sendResponse(res, true, 200, "User verified successfully");

    } catch (error) {
        console.log(error);
    }
};


function generateOTP() {
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};