
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./models/User");
const Profile = require("./models/Profile");
const Course = require("./models/Course");
const RatingAndReview = require("./models/RatingAndReview");

const students = [
  ["Aarav", "Sharma", "aarav.student@eduverse.demo"],
  ["Ananya", "Reddy", "ananya.student@eduverse.demo"],
  ["Rohan", "Mehta", "rohan.student@eduverse.demo"],
  ["Meera", "Nair", "meera.student@eduverse.demo"],
  ["Kabir", "Verma", "kabir.student@eduverse.demo"],
];

const reviews = [
  ["Full-Stack Web Development with MERN", 5, "A useful introduction to full-stack development through practical projects."],
  ["JavaScript from Zero to Advanced", 5, "The examples make JavaScript concepts easier to understand."],
  ["React.js: Build Modern Interfaces", 4, "A helpful introduction to reusable React components."],
  ["Python Programming Masterclass", 5, "A good starting point for learning Python fundamentals."],
  ["C++ Programming and OOP", 4, "Useful explanations of object-oriented programming."],
  ["Data Structures and Algorithms in C++", 5, "A helpful way to practise algorithms and problem-solving patterns."],
  ["Data Analytics with Python", 4, "The examples connect Python with practical data analysis."],
  ["Machine Learning Foundations", 5, "A useful introduction to core machine learning concepts."],
  ["Generative AI and LLM Applications", 5, "An interesting overview of generative AI and language models."],
  ["UI/UX Design with Figma", 4, "A useful introduction to wireframes and interface prototyping."],
  ["Graphic Design Fundamentals", 4, "A good introduction to visual hierarchy and design principles."],
  ["Software Engineering Interview Prep", 5, "Helpful for revising technical concepts for interviews."],
  ["Cloud Computing Fundamentals", 4, "A useful overview of cloud computing fundamentals."],
  ["Docker, CI/CD and DevOps", 5, "A helpful introduction to containers and deployment workflows."],
  ["Git and GitHub for Developers", 5, "The version-control examples are easy to follow."],
  ["Backend Engineering with Node.js", 4, "A useful overview of backend development with Node.js."],
  ["Competitive Programming Essentials", 5, "A good starting point for algorithmic thinking."],
  ["SQL and Database Design", 5, "Helpful examples for understanding SQL and relational databases."],
];

async function seedStudents() {
  const passwordHash = await bcrypt.hash(
    process.env.DEMO_STUDENT_PASSWORD,
    10
  );

  const studentUsers = [];

  for (const [firstName, lastName, email] of students) {
    let user = await User.findOne({ email });

    if (user) {
      if (user.accountType !== "Student") {
        throw new Error(`${email} exists but is not a Student.`);
      }

      studentUsers.push(user);
      console.log("Reusing:", email);
      continue;
    }

    const profile = await Profile.create({
      about: "Demo student account for EduVerse.",
    });

    user = await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      accountType: "Student",
      active: true,
      approved: true,
      additionalDetails: profile._id,
      courses: [],
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        firstName + " " + lastName
      )}`,
    });

    studentUsers.push(user);
    console.log("Created:", email);
  }

  return studentUsers;
}

async function seedReviews(studentUsers) {
  let created = 0;
  let skipped = 0;

  for (let i = 0; i < reviews.length; i++) {
    const [courseName, rating, reviewText] = reviews[i];

    const course = await Course.findOne({ courseName });

    if (!course) {
      console.log("Course not found:", courseName);
      continue;
    }

    const student = studentUsers[i % studentUsers.length];

    const existing = await RatingAndReview.findOne({
      course: course._id,
      user: student._id,
      review: reviewText,
    });

    if (existing) {
      await Course.updateOne(
        { _id: course._id },
        { $addToSet: { ratingAndReviews: existing._id } }
      );

      skipped++;
      continue;
    }

    const newReview = await RatingAndReview.create({
      user: student._id,
      rating,
      review: reviewText,
      course: course._id,
    });

    await Course.updateOne(
      { _id: course._id },
      { $addToSet: { ratingAndReviews: newReview._id } }
    );

    created++;
    console.log("Added demo review:", courseName);
  }

  console.log({ reviewsCreated: created, reviewsSkipped: skipped });
}

async function main() {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is missing from your .env file");
  }

  if (
    !process.env.DEMO_STUDENT_PASSWORD ||
    process.env.DEMO_STUDENT_PASSWORD.length < 12
  ) {
    throw new Error(
      "Set DEMO_STUDENT_PASSWORD to a password of at least 12 characters."
    );
  }

  await mongoose.connect(process.env.MONGODB_URL);
  console.log("MongoDB connected");

  const studentUsers = await seedStudents();
  await seedReviews(studentUsers);

  console.log("Demo seed completed.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
