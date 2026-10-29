import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"

export const Login = () => {
  return (
    <Template
    title= "Welcome Back"
    description1= "Build Skills for today, tommorrow, and beyond"
    description2= "Education to future-proof your career"
    image= {loginImg}
    formType="login"
    />
  )
}
