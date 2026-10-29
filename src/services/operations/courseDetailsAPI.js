import toast from "react-hot-toast";
import { courseEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";


const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_RATING_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_COURSE_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_SECTION_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    LECTURE_COMPLETION_API,

}= courseEndpoints


export const getAllCourses= async () => {
    const toastId = toast.Loading("Loading...");
    let result= []
    try{
        const response =await apiConnector("GET", GET_ALL_COURSE_API)
        if(!response?.data?.success){
            throw new Error("Could not Fetch Courses")
        }
        result= response?.data?.data
    }catch(error){
        console.log(error)
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}


export const fetchCourseDetails= async (courseId) => {
    const toastId = toast.loading("Loading...");
    //dispatch(setLoading(true));
    let result= []
    try{
        const response =await apiConnector("POST", COURSE_DETAILS_API, {
            courseId,
        }) //here we use Post instead of get for retirevel bcox, we can send courseid, in the body of the post itself, but for get you have to send it in the url, you can use either of them
        if(!response?.data?.success){
            throw new Error(response.data.message)
        }
        console.log("COURSE DETAILS API RESPONSE:", response);
        result= response?.data
         console.log(result)
    }catch(error){
        console.log(error)
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    //dispatch(setLoading(false));
    return result
}


export const fetchCourseCategories= async () => {
    let result= []
    try{
        const response = await apiConnector("GET",COURSE_CATEGORIES_API)
        if(!response?.data?.success){
            throw new Error("Could not Fetch Course Categories")
        }
        result= response?.data?.data
    }catch(error){
        console.log(error)
        toast.error(error.message);
    }
    return result
}


//add course details

export const addCourseDetails = async (data,token) => {
    let result = null
    const toastId= toast.loading("Loading...")
    try{
        console.log("Token",token);
        const response= await apiConnector("POST", CREATE_COURSE_API, data,{
            Authorization : `Bearer ${token}`,
        })
        if(!response?.data?.success){
            throw new Error(" Could Not Add Course Details")
        }

        toast.success("Course Details Added Successfully")
        result= response?.data?.data
    }catch(error){
         console.log("CREATE COURSE ERROR:", error);
    console.log("BACKEND RESPONSE:", error?.response?.data);
    console.log("STATUS:", error?.response?.status);
    console.log("SENT DATA:", data);

    toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Could Not Add Course Details"
    );
    }
    toast.dismiss(toastId)
    return result
}


//edit course details
export const editCourseDetails = async (data,token) => {
    let result = null
    const toastId= toast.loading("Loading...")
    try{
        const response= await apiConnector("POST", EDIT_COURSE_API, data,{
            // "Content-Type" : "multipart/form-data", ////this means I'm sending the request as form data, possibly including files."
            Authorization : `Bearer ${token}`,
        })

        if(!response?.data?.success){
            throw new Error(" Could Not Update Course Details")
        }
        toast.success("Course Details Updated Successfully")
        result= response?.data?.data
    }catch(error){
        console.log(error)
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}

//create a section
export const createSection = async (data,token) => {
    let result = null
    const toastId= toast.loading("Loading...")
    try{
        const response= await apiConnector("POST", CREATE_SECTION_API, data,{
            Authorization : `Bearer ${token}`,
        })
        if(!response?.data?.success){
            throw new Error("Could Not Create Section")
        }
        toast.success("Course Section Created Successfully")
        result= response?.data?.updatedCourse
    }catch(error){
        console.log(error)
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}

//create a subsection
export const createSubSection = async (data,token) => {
    let result = null
    const toastId= toast.loading("Loading...")
    try{
        const response= await apiConnector("POST", CREATE_SUBSECTION_API, data,{
            Authorization : `Bearer ${token}`,
        })
        if(!response?.data?.success){
            throw new Error("Could Not Add Lecture")
        }
        toast.success("Lecture Added successfully")
        result= response?.data?.data
    }catch(error){
        console.log(error)
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}

//update a section
export const updatesection = async (data,token) => {
    let result = null
    const toastId= toast.loading("Loading...")
    try{
        const response= await apiConnector("POST", UPDATE_SECTION_API, data,{
            Authorization : `Bearer ${token}`,
        })
        if(!response?.data?.success){
            throw new Error("Could Not Update Section")
        }
        toast.success("Course Section Updated")
        console.log("UPDATE RESPONSE:", response.data)
        result= response?.data?.message
    }catch(error){
        console.log(error)
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}


//update a subsection
export const updateSubSection = async (data,token) => {
    let result = null
    const toastId= toast.loading("Loading...")
    try{
        const response= await apiConnector("POST", UPDATE_SUBSECTION_API, data,{
            Authorization : `Bearer ${token}`,
        })
        if(!response?.data?.success){
            throw new Error("Could Not update Lecture")
        }
        toast.success("Lecture Updated successfully")
        console.log("updated:", response.data)
        result= response?.data?.data
    }catch(error){
        console.log(error)
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}

//delete a section
export const deleteSection = async (data,token) => {
    let result = null
    const toastId= toast.loading("Loading...")
    try{
        const response= await apiConnector("POST", DELETE_SECTION_API, data,{
            Authorization : `Bearer ${token}`,
        })
        if(!response?.data?.success){
            throw new Error("Could Not delete section")
        }
        toast.success("Course section deleted successfully")
        result = response?.data?.success

    }catch(error){
        console.log(error)
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}

//delte a subsection
export const deleteSubSection = async (data,token) => {
    let result = null
    const toastId= toast.loading("Loading...")
    try{
        const response= await apiConnector("POST", DELETE_SUBSECTION_API, data,{
            Authorization : `Bearer ${token}`,
        })
        if(!response?.data?.success){
            throw new Error("Could Not delete Lecture")
        }
        toast.success("Lecture Deleted Successfully")
        console.log("response",response.data)
        result= response?.data?.success

    }catch(error){
        console.log(error)
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}

//fetching all courses under a specific instructor
export const fetchInstructorCourses = async (token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null,{
            Authorization: `Bearer ${token}`,
        }
        )
        console.log(response)
        if(!response?.data?.success){
            throw new Error("Could not Fetch Instructor Courses")
        }
        result= response?.data?.data
    }catch(error){
        console.log(error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


//delete a course
export const deleteCourse = async (data,token) => {
    let result = null
    const toastId= toast.loading("Loading...")
    try{
        const response= await apiConnector("DELETE", DELETE_COURSE_API, data,{
            Authorization : `Bearer ${token}`,
        })
        if(!response?.data?.success){
            throw new Error("Could Not delete Course")
        }
        toast.success("Course Deleted Successfully")
        result= response?.data?.data
    }catch(error){
        console.log(error)
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}

//get full details of a course
export const getFullDetailsOfCourse = async (courseId, token) => {
    const toastId= toast.loading("Loading...")
    let result= null
    try{
        const response = await apiConnector("POST",
            GET_FULL_COURSE_DETAILS_AUTHENTICATED,
            {
                courseId,
            },
         {
                Authorization: `Bearer ${token}`,
        }
     )

     if(!response.data.success){
        throw new Error(response.data.message)
     }
     result= response?.data?.data

    }catch (error) {
    console.error(
        "GET FULL COURSE DETAILS ERROR:",
        error.response?.data || error.message
    );

        toast.error("Could not fetch course details");
        return null;
    }
    toast.dismiss(toastId)
    return result
}


//mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector(
            "POST",
            LECTURE_COMPLETION_API,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response.data.message) {
            throw new Error(
                response.data.error || "Failed to complete lecture"
            );
        }

        toast.success("Lecture completed");
        return true;
    } catch (error) {
        console.error(
            "markLectureAsComplete error:",
            error.response?.data || error.message
        );

        toast.error(
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to complete lecture"
        );

        return false;
    } finally {
        toast.dismiss(toastId);
    }
};


//create rating for course
export const createRating = async (data, token) => {
    const toastId= toast.loading("Loading...")
    let success= null
    try{
        const response = await apiConnector("POST", 
           CREATE_RATING_API,
        data,
         {
                Authorization: `Bearer ${token}`,
        }
     )

     if(!response.data.success){
        throw new Error("Could not Create Rating")
     }
     toast.success("Rating Created")
     success= true

    }catch(error){
        console.log(error)
        toast.error(error.message)
        success= false
    }
    toast.dismiss(toastId)
    return success
}













