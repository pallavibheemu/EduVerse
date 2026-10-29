
require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("./models/Course");

async function migrateCourseTimestamps() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    const result = await Course.updateMany(
      {
        createdAt: { $exists: false },
      },
      [
        {
          $set: {
            createdAt: "$$NOW",
            updatedAt: "$$NOW",
          },
        },
      ]
    );

    console.log("Courses updated:", result.modifiedCount);
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

migrateCourseTimestamps();

