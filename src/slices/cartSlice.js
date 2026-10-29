import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const totalItems= localStorage.getItem("totalItems");

const initialState= {
    cart: localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):[],
    total: localStorage.getItem("total")? JSON.parse(localStorage.getItem("total")):0,
    totalItems: totalItems? JSON.parse(totalItems):0
}

//now we create a slice
const cartSlice= createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addToCart: (state,action) => {
            const course = action.payload
            const index= state.cart.findIndex((item) => item._id === course._id) //This line is finding WHERE a particular course exists inside your cart.

            if(index>=0){
                //means the course already exits in the cart
                toast.error("Course already in the cart");
                return
            }
            //if the course does not exist in the cart, then add it to the cart
           state.cart.push(course);

            console.log(
                        "Cart after adding:",
                        JSON.parse(JSON.stringify(state.cart))
                    );
            console.log("Course price:", course.price);
            //update the total quantity and price
            state.totalItems++;
            state.total += course.price
            //update everythuing to the local storage for future use
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            //show toast
            toast.success("Course added to cart");
        },
        removeFromCart:(state,action) => {
            const courseId = action.payload
            const index= state.cart.findIndex((item) => item._id === courseId);

            if(index>=0){
                //if the course is present in the cart, we remove it
                state.totalItems--;
                state.total -= state.cart[index].price;
                state.cart.splice(index,1);//Removes 1 item from the cart array, starting at the position index.

            //update everythuing to the local storage for future use
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            //show toast
            toast.success("Course removed from cart");
            }
        },
        resetCart:(state) =>{
            state.cart= [];
            state.total=0;
            state.totalItems=0;

            //update
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");
        },
    }
});


export const {addToCart, removeFromCart, resetCart}= cartSlice.actions;
export default cartSlice.reducer;
