import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")):null,
    loading: false,
    signupData:null,
};
//JSON.parse, we use this, beacause the local storage stores items in string and returns the same way, so we need to parse it to convert the string into an object

//now we create a slice
const authSlice= createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setSignupData(state,value){
            state.signupData= value.payload;
        },
        setLoading(state,value){ // here loading means, the API request is in process, if loading is true, if it is false then we know that it is completed , so by knowing this we can show spinner instead of showing a blank screen while the user logs in
            state.loading= value.payload;
        },
        setToken(state,action){
            state.token=action.payload;
        },
    }
});


export const {setToken, setLoading, setSignupData}= authSlice.actions;
export default authSlice.reducer


