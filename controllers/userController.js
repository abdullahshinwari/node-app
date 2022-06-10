const db = require('../models')
const otpGenerator = require('otp-generator');

// create main Model
const User = db.users

// create user
const addUser = async (req, res) => {
  try {
    let info = {
      name: req.body.name,
      otp: req.body.otp,
      otp_expiration_date : req.body.otp_expiration_date,
      phone_number: req.body.phone_number
    }
    const user = await User.create(info)
    res.status(200).send(user)
  } catch (error) {
    console.log(error);
    return res.send({
      status: "ERROR",
      message: "Something went wrong",
      statusCode: 400
    })
  }
}

// generate otp
const generate_otp = async (req, res) => {

  try {
    let name = req.body.name 
    let User_info = await User.findOne({where: { name: name },});
    if (User_info.length != 0){
      const OTP = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false });
      let current_date_time = new Date()
      let expire_date_time = new Date(current_date_time.getTime() + 5*60000)

      const updated_User_info = await User.update({otp: OTP, otp_expiration_date: expire_date_time}, {where: {id: User_info.id},})
      
      return res.status(200).send({'Message': 'OTP is updated !!', 'OTP': OTP, "user id": User_info.id})
    } else {
      return res.status(404).send({"Message": "User not found"})
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: "ERROR",
      message: "Something went wrong",
      statusCode: 400
    })
  }

}

// verify OTP and expiration date and time
const verify = async (req, res) => {
  try {
    let otp = req.query.otp
    let user_id = req.query.user_id
    let User_info = await User.findOne({where: { id: user_id },});
    let current_date_time = new Date()
    
    if(User_info.otp_expiration_date > current_date_time && otp == User_info.otp) {
      res.status(200).send({"message":"OTP is verified !!!"})
    } else {
      res.status(401).send({"message":"OTP is incorrect or expired !!!"})
    }

  } catch (error) {
    console.log(error);
    return res.send({
      status: "ERROR",
      message: "Something went wrong",
      statusCode: 400
    })
  }
}

// hello
const hello = (req, res) => {
  res.status(200).send({'Message': 'Hello World'})
}

module.exports = {
  addUser,
  generate_otp,
  verify,
  hello,
}