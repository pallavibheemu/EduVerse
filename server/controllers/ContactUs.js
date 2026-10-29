const contactFormEmail = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")



exports.contactUsController = async(req,res) => {
    const {email, firstName, lastName, message, phoneNo, countryCode} = req.body
    try{
        const emailRes = await mailSender(
            email,
            "your Data is Sent Successfully",
            contactFormEmail(email, firstName, lastName, message, phoneNo, countryCode)
        )

        return res.json({
            success:true,
            message:"Email send successfully",
        })
    }catch(error){
        console.log(error)
        return res.json({
            success:false,
            message:"something went wrong...",
        })
    }
}