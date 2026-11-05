const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");


//new code to buy multiple courses at a time

//capture the payment and initiate the razorpay order
exports.capturePayment = async(req, res) => {
    const {courses} = req.body
    const userId = req.user.id
    if(courses.length === 0) {
        return res.json({
            success: false,
            message:"Please Provide Course ID",
        })
    }

    let total_amount = 0
    for(const course_id of courses){
        let course
        try{
            //find the course by its id
            course= await Course.findById(course_id)

            //if the course is not found , return an error
            if(!course){
                return res.status(200).json({
                    success:false,
                    message:"Could not find the Course"
                })
            }

            //check if the user is already enrolled in the course
            const uid = new mongoose.Types.ObjectId(userId) // we do this bcoz, the user id that we are about to search is in the form of object id, so we first convert the userId into object id and then search
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"Student is already Enrolled"
                })
            }

            //add the price of the course to the total amount
            total_amount+= course.price
        }catch(error){
            console.log(error.message)
            return res.status(500).json({
                success:false,
                message: error.message,
            })
        }
    }

    const options= {
        amount: total_amount*100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try{
        //intiate the payment using razorpay
        const paymentResponse= await instance.orders.create(options)
        console.log(paymentResponse)
        res.json({
            success:true,
            data:paymentResponse,
        })

    }catch(error){
        console.log(error.message)
        res.status(500).json({
            success:false,
            message:"Could not initiate order."
        })
    }
}


//verify payment
exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            courses
        } = req.body;

        const userId = req.user.id;

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature ||
            !Array.isArray(courses) ||
            courses.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment details are incomplete"
            });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            });
        }

        await enrollStudents(courses, userId);

        return res.status(200).json({
            success: true,
            message: "Payment verified and enrollment successful"
        });

    } catch (error) {
        console.error("Payment verification error:", error);

        return res.status(500).json({
            success: false,
            message: "Payment verification or enrollment failed"
        });
    }
};

//send the payment sucess email
exports.sendPaymentSuccessEmail = async(req,res) => {
    const {orderId , paymentId, amount} = req.body
    const userId= req.user.id

    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({
            success:false,
            message: "Please provide all the details",
        })
    }

    try{
        const enrolledStudent = await User.findById(userId)

        await mailSender(enrolledStudent.email, `Payment Received`, paymentSuccessEmail(
                                                                        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                                                                        amount/100,
                                                                        orderId,
                                                                        paymentId,
                                                                    ))
    }catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Could not send email",
        })
    }
}


//enroll the student in the course
const enrollStudents = async (courses, userId) => {
    if (!userId || !courses || courses.length === 0) {
        throw new Error("Please provide Course ID and User ID");
    }

    for (const courseId of courses) {
        // Find the course
        const enrolledCourse = await Course.findByIdAndUpdate(
            courseId,
            { $addToSet: { studentsEnrolled: userId } },
            { new: true }
        );

        if (!enrolledCourse) {
            throw new Error("Course not found");
        }

        // Create course progress
        const courseProgress = await CourseProgress.create({
            courseID: courseId,
            userId: userId,
            completedVideos: [],
        });

        // Update student details
        const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: {
                    courses: courseId,
                    courseProgress: courseProgress._id,
                },
            },
            { new: true }
        );

        if (!enrolledStudent) {
            throw new Error("Student not found");
        }

        console.log("Student enrolled successfully:", enrolledStudent._id);

        // Send enrollment email separately.
        // Email failure should not invalidate enrollment.
        try {
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(
                    enrolledCourse.courseName,
                    `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
                )
            );

            console.log(
                "Enrollment email result:",
                emailResponse?.response || "Email service returned no response"
            );
        } catch (emailError) {
            console.error("Enrollment email failed:", emailError.message);
        }
    }
};




















// //this code is to buy only one course, but we need to buy multiple courses, hence we write a lil bit different code
// //capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req, res) => {
//     //get courseId and UserID
//     const {course_id} = req.body;
//     const userId = req.user.id;
//     //validation
//     //valid courseID
//     if(!course_id) {
//         return res.json({
//             success:false,
//             message:'Please provide valid course ID',
//         })
//     };
//     //valid courseDetail
//     let course;
//     try{
//         course = await Course.findById(course_id);
//         if(!course) {
//             return res.json({
//                 success:false,
//                 message:'Could not find the course',
//             });
//         }

//         //user already pay for the same course
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)) {
//             return res.status(200).json({
//                 success:false,
//                 message:'Student is already enrolled',
//             });
//         }
//     }
//     catch(error) {
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         });
//     }
    
//     //order create
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount: amount * 100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes:{
//             courseId: course_id,
//             userId,
//         }
//     };

//     try{
//         //initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);
//         //return response
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         });
//     }
//     catch(error) {
//         console.log(error);
//         res.json({
//             success:false,
//             message:"Could not initiate order",
//         });
//     }
    

// };

// //verify Signature of Razorpay and Server

// exports.verifySignature = async (req, res) => {
//     const webhookSecret = "12345678";

//     const signature = req.headers["x-razorpay-signature"];

//     const shasum =  crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest) {
//         console.log("Payment is Authorised");

//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try{
//                 //fulfil the action

//                 //find the course and enroll the student in it
//                 const enrolledCourse = await Course.findOneAndUpdate(
//                                                 {_id: courseId},
//                                                 {$push:{studentsEnrolled: userId}},
//                                                 {new:true},
//                 );

//                 if(!enrolledCourse) {
//                     return res.status(500).json({
//                         success:false,
//                         message:'Course not Found',
//                     });
//                 }

//                 console.log(enrolledCourse);

//                 //find the student andadd the course to their list enrolled courses me 
//                 const enrolledStudent = await User.findOneAndUpdate(
//                                                 {_id:userId},
//                                                 {$push:{courses:courseId}},
//                                                 {new:true},
//                 );

//                 console.log(enrolledStudent);

//                 //mail send krdo confirmation wala 
//                 const emailResponse = await mailSender(
//                                         enrolledStudent.email,
//                                         "Congratulations from CodeHelp",
//                                         "Congratulations, you are onboarded into new CodeHelp Course",
//                 );

//                 console.log(emailResponse);
//                 return res.status(200).json({
//                     success:true,
//                     message:"Signature Verified and COurse Added",
//                 });


//         }       
//         catch(error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//         }
//     }
//     else {
//         return res.status(400).json({
//             success:false,
//             message:'Invalid request',
//         });
//     }


// };




