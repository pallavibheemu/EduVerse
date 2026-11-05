import toast from "react-hot-toast"
import {studentEndpoints} from "../apis"
import { apiConnector } from "../apiconnector"
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice"
import { resetCart } from "../../slices/cartSlice"

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API,
}= studentEndpoints

//if you do not get it, do a search on razorpay doc on web
//load the razorpay SDK from the CDN
function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = src
        script.onload= () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

//buy the course
export async function BuyCourse(token, courses, user_details, navigate, dispatch){
    console.log("BuyCourse started");
    const toastId = toast.loading("Loading...")
    try{
        //loading the script of razorpay
         const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        console.log("Creating Razorpay order...");
        //intiating the order in backend
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
        {
            courses,
        },{
            Authorization: `Bearer ${token}`,
        })

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message)
        }
        console.log("Payment response from backend............", orderResponse.data)


        //opening the razorpay SDK
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "EduVerse",
            description: "Thank You for Purchasing the Course",
            image: rzpLogo,
            prefill:{
                name: `${user_details.firstName} ${user_details.lastName}`,
                email: user_details.email,
            },
            handler: async function(response) {
                const verified = await verifyPayment(
                    { ...response, courses },
                    token,
                    navigate,
                    dispatch
                );

                if (verified) {
                    sendPaymentSuccessEmail(
                        response,
                        orderResponse.data.data.amount,
                        token
                    );
                }
            },
        }
        const paymentObject = new window.Razorpay(options)

        paymentObject.open()
        paymentObject.on("payment.failed", function(response){
            toast.error("Oops! Payment Failed.")
            console.log(response.error)
        })
    }catch(error){
        console.log("PAYMENT API ERROR..........",error)
        toast.error("Couldn't make the payment")
    }
    toast.dismiss(toastId)
}


//verify the payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));

    let verified = false;

    try {
        const response = await apiConnector(
            "POST",
            COURSE_VERIFY_API,
            bodyData,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        console.log("VERIFY PAYMENT RESPONSE FROM BACKEND:", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        verified = true;

        toast.success("Payment Successful! You are enrolled in the course.");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());

    } catch (error) {
        console.log("PAYMENT VERIFY ERROR:", error);
        toast.error("Couldn't Verify Payment.");

    } finally {
        toast.dismiss(toastId);
        dispatch(setPaymentLoading(false));
    }

    return verified;
}

async function sendPaymentSuccessEmail(response, amount, token){
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, 
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },
            {
                Authorization:`Bearer ${token}`,
            }
        )
    }catch(error){
        console.log("PAYEMENT SUCCESS EMAIL ERROR.........", error)
    }
}