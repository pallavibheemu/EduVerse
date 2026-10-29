const CourseProgress = require("../models/CourseProgress")
const SubSection = require("../models/Subsection")
const mongoose = require("mongoose");


exports.updateCourseProgress = async (req, res) => {
    console.log("Controller reached");

    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;

    console.log("Request body:", req.body);
    console.log("User ID:", userId);

    try {
        const subSection = await SubSection.findById(subSectionId);

        console.log("Subsection found:", !!subSection);

        if (!subSection) {
            return res.status(404).json({
                error: "Invalid subsection"
            });
        }

        const allProgress = await CourseProgress.find({
                userId: userId,
            });

            console.log("All progress records for this user:", allProgress);


        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        });

        console.log("Course progress found:", !!courseProgress);


        if (!courseProgress) {
                courseProgress = await CourseProgress.create({
                    courseID: courseId,
                    userId: userId,
                    completedVideos: [],
                });
           
        } else {
            //if course progress exists, check if the subsection is already complted
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    error: "Subsection is already completed"
                })
            }

            //push the subsection into the completed videos array
            courseProgress.completedVideos.push(subSectionId)
        }

        //save the updated course progress
        await courseProgress.save()

        return res.status(200).json({
            message:"Course progress updated",
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            error:"Internal server error"
        })
    }
}