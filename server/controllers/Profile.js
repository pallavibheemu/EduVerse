const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const mongoose = require("mongoose");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");
const bcrypt = require("bcrypt");
const Course = require("../models/Course");

// Method for updating a profile
exports.updateProfile = async (req, res) => {
	try {
		const { dateOfBirth = "", about = "", contactNumber="", gender="", firstName="", lastName="" } = req.body;
		const id = req.user.id;

		// Find the profile by id
		const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);

		const user= await User.findByIdAndUpdate(id, {
			firstName,
			lastName,
		})
		await user.save()

		// Update the profile fields
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;
		profile.gender= gender;

		// Save the updated profile
		await profile.save();

		//find th eupdated user details
		const updatedUserDetails = await User.findById(id)
		.populate("additionalDetails")
		.exec()

		return res.json({
			success: true,
			message: "Profile updated successfully",
			updatedUserDetails,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.deleteAccount = async (req, res) => {
	try {
		// TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);
		console.log("Printing ID: ", req.user.id);
		const id = req.user.id;
		
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.additionalDetails });
		// TODO: Unenroll User From All the Enrolled Courses
		// Now Delete User
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        const userDetails = await User.findOne({
            _id: userId,
        })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                },
            })
            .exec();

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: `Could not find user with id: ${userId}`,
            });
        }

        const user = userDetails.toObject();

        for (let i = 0; i < user.courses.length; i++) {
            let totalDurationInSeconds = 0;
            let subSectionLength = 0;

            for (
                let j = 0;
                j < user.courses[i].courseContent.length;
                j++
            ) {
                const subSections =
                    user.courses[i].courseContent[j].subSection || [];

                totalDurationInSeconds += subSections.reduce(
                    (acc, curr) => acc + (parseInt(curr.timeDuration, 10) || 0),
                    0
                );

                subSectionLength += subSections.length;
            }

            user.courses[i].totalDuration =
                convertSecondsToDuration(totalDurationInSeconds);

            const courseProgress = await CourseProgress.findOne({
                courseID: user.courses[i]._id,
                userId: userId,
            });

            const completedVideos =
                courseProgress?.completedVideos?.length || 0;

            if (subSectionLength === 0) {
                user.courses[i].progressPercentage = 100;
            } else {
                user.courses[i].progressPercentage =
                    Math.round(
                        (completedVideos / subSectionLength) * 10000
                    ) / 100;
            }
        }

        return res.status(200).json({
            success: true,
            data: user.courses,
        });

    } catch (error) {
        console.error("Error fetching enrolled courses:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({
            instructor: req.user.id,
        });

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled =
                course.studentsEnrolled?.length ?? 0;

            const totalAmountGenerated =
                totalStudentsEnrolled * course.price;

            return {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
            };
        });

        return res.status(200).json({
            success: true,
            message: "Instructor dashboard data fetched successfully",
            data: courseData,
        });

    } catch (error) {
        console.error("Instructor Dashboard Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
