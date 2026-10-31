
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./models/User");
const Profile = require("./models/Profile");
const Category = require("./models/Category");
const Course = require("./models/Course");
const Section = require("./models/Section");
const SubSection = require("./models/SubSection");

const DEMO_PASSWORD = process.env.DEMO_INSTRUCTOR_PASSWORD;

// Keep these emails consistent with your existing demo accounts.
const instructors = [
  {
    firstName: "Aarav",
    lastName: "Sharma",
    email: "aarav.demo@eduverse.example",
    about: "Web development instructor",
    image: "https://api.dicebear.com/9.x/initials/svg?seed=Aarav%20Sharma",
    courseNames: [
      "Full-Stack Web Development with MERN",
      "JavaScript from Zero to Advanced",
      "React.js: Build Modern Interfaces",
    ],
  },
  {
    firstName: "Priya",
    lastName: "Reddy",
    email: "priya.demo@eduverse.example",
    about: "Programming and algorithms instructor",
    image: "https://api.dicebear.com/9.x/initials/svg?seed=Priya%20Reddy",
    courseNames: [
      "Python Programming Masterclass",
      "C++ Programming and OOP",
      "Data Structures and Algorithms in C++",
    ],
  },
  {
    firstName: "Rahul",
    lastName: "Verma",
    email: "rahul.demo@eduverse.example",
    about: "AI and data instructor",
    image: "https://api.dicebear.com/9.x/initials/svg?seed=Rahul%20Verma",
    courseNames: [
      "Data Analytics with Python",
      "Machine Learning Foundations",
      "Generative AI and LLM Applications",
    ],
  },
  {
    firstName: "Ananya",
    lastName: "Iyer",
    email: "ananya.demo@eduverse.example",
    about: "Design instructor",
    image: "https://api.dicebear.com/9.x/initials/svg?seed=Ananya%20Iyer",
    courseNames: [
      "UI/UX Design with Figma",
      "Graphic Design Fundamentals",
      "Software Engineering Interview Prep",
    ],
  },
  {
    firstName: "Karthik",
    lastName: "Nair",
    email: "karthik.demo@eduverse.example",
    about: "Cloud and developer tools instructor",
    image: "https://api.dicebear.com/9.x/initials/svg?seed=Karthik%20Nair",
    courseNames: [
      "Cloud Computing Fundamentals",
      "Docker, CI/CD and DevOps",
      "Git and GitHub for Developers",
    ],
  },
  {
    firstName: "Sneha",
    lastName: "Kapoor",
    email: "sneha.demo@eduverse.example",
    about: "Software engineering instructor",
    image: "https://api.dicebear.com/9.x/initials/svg?seed=Sneha%20Kapoor",
    courseNames: [
      "Backend Engineering with Node.js",
      "Competitive Programming Essentials",
      "SQL and Database Design",
    ],
  },
];

const categoryNames = [
  "Web Development",
  "Programming",
  "DSA",
  "Data Science",
  "AI & ML",
  "Design",
  "Cloud & DevOps",
  "Developer Tools",
  "Career Development",
  "Databases",
];

// Original 18 courses and their metadata are preserved.
const courses = [
  {
    courseName: "Full-Stack Web Development with MERN",
    courseDescription: "Learn to build full-stack web applications using React, Node.js, Express, and MongoDB.",
    whatYouWillLearn: "Build responsive frontends, REST APIs, authentication, and database-backed applications.",
    price: 1499,
    tag: ["MERN", "React", "Node.js", "MongoDB"],
    category: "Web Development",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900",
    instructions: ["Know basic computer usage", "Practice coding alongside the lessons"],
    videoId: "Oe421EPjeBE",
    curriculum: [["Web Foundations", [
      { title: "How the Web Works", videoId: "" },
    ]],
    ["JavaScript for Frontend Development", [
      { title: "Variables and Data Types", videoId: "" },

    ]],
    ["React Frontend", [
      { title: "React Project Setup with Vite", videoId: "" },
    ]],
    ["Integration and Deployment", [
      { title: "Connecting React to an API", videoId: "" },
    ]]
 ],
  },
  {
    courseName: "JavaScript from Zero to Advanced",
    courseDescription: "Learn JavaScript fundamentals, modern syntax, asynchronous programming, and practical coding.",
    whatYouWillLearn: "Use functions, arrays, objects, promises, async/await, and modern JavaScript.",
    price: 799,
    tag: ["JavaScript", "Programming", "Web"],
    category: "Web Development",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900",
    instructions: ["No prior JavaScript experience required"],
    videoId: "PkZNo7MFNFg",
    curriculum: [
      ["JavaScript Foundations", ["Introduction to JavaScript", "Variables and Data Types", "Conditions and Loops"]],
      ["Functions and Data", ["Functions and Scope", "Arrays and Array Methods", "Objects and Modern Syntax"]],
      ["DOM and Projects", ["Selecting and Updating HTML", "Events and Forms", "Build an Interactive Mini App"]],
    ],
  },
  {
    courseName: "React.js: Build Modern Interfaces",
    courseDescription: "Build interactive interfaces with React components, hooks, routing, and state management.",
    whatYouWillLearn: "Create reusable components and connect React applications to APIs.",
    price: 999,
    tag: ["React", "Frontend", "JavaScript"],
    category: "Web Development",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900",
    instructions: ["Basic JavaScript knowledge is recommended"],
    videoId: "bMknfKXIFA8",
    curriculum: [
      ["React Fundamentals", ["Introduction to React", "JSX and Components", "Props and Lists"]],
      ["State and Hooks", ["useState and Events", "useEffect Basics", "Forms and Controlled Inputs"]],
      ["Building Applications", ["Fetching API Data", "Routing and Page Structure", "Build a React Mini App"]],
    ],
  },
  {
    courseName: "Python Programming Masterclass",
    courseDescription: "Learn Python syntax, collections, functions, object-oriented programming, and automation.",
    whatYouWillLearn: "Write Python programs and solve practical programming problems.",
    price: 699,
    tag: ["Python", "Programming", "Beginner"],
    category: "Programming",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=900",
    instructions: ["No previous programming experience required"],
    videoId: "rfscVS0vtbw",
    curriculum: [
      ["Python Foundations", ["Introduction to Python", "Variables and Data Types", "Conditions and Loops"]],
      ["Functions and Collections", ["Lists, Tuples and Dictionaries", "Functions and Return Values", "Files and Exceptions"]],
      ["Object-Oriented Python", ["Classes and Objects", "Modules and Packages", "Build a Python Mini Project"]],
    ],
  },
  {
    courseName: "C++ Programming and OOP",
    courseDescription: "Learn C++ fundamentals, classes, inheritance, pointers, and object-oriented programming.",
    whatYouWillLearn: "Write structured C++ programs using OOP concepts and standard containers.",
    price: 799,
    tag: ["C++", "OOP", "Programming"],
    category: "Programming",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900",
    instructions: ["Bring a computer with a C++ compiler or online IDE"],
    videoId: "vLnPwxZdW4Y",
    curriculum: [
      ["C++ Basics", ["Introduction and Setup", "Variables and Operators", "Conditions and Loops"]],
      ["Functions and Collections", ["Functions and Parameters", "Arrays and Strings", "Pointers and References"]],
      ["Object-Oriented Programming", ["Classes and Objects", "Encapsulation and Inheritance", "Practice Program"]],
    ],
  },
  {
    courseName: "Data Structures and Algorithms in C++",
    courseDescription: "Study arrays, linked lists, trees, graphs, recursion, dynamic programming, and complexity.",
    whatYouWillLearn: "Choose suitable data structures and solve algorithmic problems.",
    price: 1499,
    tag: ["DSA", "C++", "Algorithms"],
    category: "DSA",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900",
    instructions: ["Basic programming and C++ knowledge recommended"],
    videoId: "B31LgI4Y4DQ",
    curriculum: [
      ["Algorithm Foundations", ["Big-O Complexity", "Arrays and Strings", "Searching and Sorting"]],
      ["Data Structures", ["Linked Lists and Stacks", "Trees and Binary Search Trees", "Heaps and Hashing"]],
      ["Graphs and Practice", ["Graph Representation and BFS/DFS", "Shortest Paths", "Problem-Solving Practice"]],
    ],
  },
  {
    courseName: "Data Analytics with Python",
    courseDescription: "Explore data cleaning, analysis, and visualization using Python libraries.",
    whatYouWillLearn: "Analyze datasets with NumPy and pandas and communicate findings.",
    price: 1099,
    tag: ["Python", "Analytics", "pandas"],
    category: "Data Science",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900",
    instructions: ["Basic Python knowledge is helpful"],
    videoId: "r-uOLxNrNk8",
    curriculum: [
      ["Working with Data", ["Analytics Workflow", "Loading and Inspecting Data", "Cleaning Missing Values"]],
      ["Analysis and Visualization", ["Filtering and Grouping", "Charts and Visual Exploration", "Exploratory Data Analysis"]],
      ["Reporting Insights", ["Answering Business Questions", "Communicating Findings", "Mini Analytics Project"]],
    ],
  },
  {
    courseName: "Machine Learning Foundations",
    courseDescription: "An introduction to regression, classification, model evaluation, and ML workflows.",
    whatYouWillLearn: "Understand common ML algorithms and evaluate simple models.",
    price: 1499,
    tag: ["Machine Learning", "Python", "AI"],
    category: "AI & ML",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900",
    instructions: ["Basic Python and introductory statistics are recommended"],
    videoId: "NWONeJKn6kc",
    curriculum: [
      ["ML Fundamentals", ["What Is Machine Learning?", "Data Preparation and Features", "Training and Test Sets"]],
      ["Models and Evaluation", ["Regression and Classification", "Model Evaluation Metrics", "Overfitting and Regularization"]],
      ["Practical Workflow", ["Build a Baseline Model", "Compare Models", "Communicate Results"]],
    ],
  },
  {
    courseName: "Generative AI and LLM Applications",
    courseDescription: "Explore large language models, prompt design, embeddings, and retrieval-augmented generation.",
    whatYouWillLearn: "Understand LLM application patterns and build introductory AI workflows.",
    price: 1299,
    tag: ["Generative AI", "LLM", "AI"],
    category: "AI & ML",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900",
    instructions: ["Basic programming knowledge recommended"],
    videoId: "kCc8FmEb1nY",
    curriculum: [
      ["LLM Fundamentals", ["What Are Large Language Models?", "Prompt Design", "Structured Outputs"]],
      ["Retrieval and Context", ["Embeddings and Semantic Search", "Retrieval-Augmented Generation", "Grounding and Hallucinations"]],
      ["AI Application Design", ["Calling an LLM API", "Safety and Privacy Basics", "Prototype an AI Assistant"]],
    ],
  },
  {
    courseName: "UI/UX Design with Figma",
    courseDescription: "Practice wireframing, prototyping, reusable components, and interface design.",
    whatYouWillLearn: "Create user flows, wireframes, and interactive design prototypes.",
    price: 799,
    tag: ["UI/UX", "Figma", "Design"],
    category: "Design",
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900",
    instructions: ["No previous design experience required"],
    videoId: "FTFaQWZBqQ8",
    curriculum: [
      ["Design Foundations", ["Introduction to UI and UX", "User Flows and Wireframes", "Layout and Typography"]],
      ["Figma Essentials", ["Frames and Auto Layout", "Components and Variants", "Styles and Design Systems"]],
      ["Prototyping", ["Interactive Prototypes", "Usability Review", "Portfolio Case Study"]],
    ],
  },
  {
    courseName: "Graphic Design Fundamentals",
    courseDescription: "Learn typography, layout, color theory, composition, and visual hierarchy.",
    whatYouWillLearn: "Apply design fundamentals to digital graphics and social media layouts.",
    price: 599,
    tag: ["Graphic Design", "Typography", "Design"],
    category: "Design",
    thumbnail: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=900",
    instructions: ["A design application is helpful but not required"],
    videoId: "YqQx75OPRa0",
    curriculum: [
      ["Visual Design Basics", ["Elements and Principles of Design", "Color Theory", "Typography Basics"]],
      ["Composition and Assets", ["Layout and Visual Hierarchy", "Images and Icons", "Designing for Different Formats"]],
      ["Practice and Critique", ["Create a Social Graphic", "Review and Refine", "Export and Present Work"]],
    ],
  },
  {
    courseName: "Software Engineering Interview Prep",
    courseDescription: "Review coding patterns, OOP, databases, operating systems, and interview techniques.",
    whatYouWillLearn: "Structure interview preparation and practice common software engineering topics.",
    price: 999,
    tag: ["Interview", "Software Engineering", "Career"],
    category: "Career Development",
    thumbnail: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900",
    instructions: ["Some programming experience is recommended"],
    videoId: "B31LgI4Y4DQ",
    curriculum: [
      ["Problem-Solving Process", ["Clarifying the Problem", "Brute Force to Optimized", "Complexity Analysis"]],
      ["Interview Patterns", ["Arrays, Strings and Hash Maps", "Trees and Graphs", "Dynamic Programming Basics"]],
      ["Interview Communication", ["Explaining Your Approach", "Project Deep Dive", "Mock Interview Checklist"]],
    ],
  },
  {
    courseName: "Cloud Computing Fundamentals",
    courseDescription: "Understand cloud service models, storage, networking, and scalable infrastructure.",
    whatYouWillLearn: "Explain core cloud concepts and common deployment architectures.",
    price: 899,
    tag: ["Cloud", "Infrastructure", "Computing"],
    category: "Cloud & DevOps",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900",
    instructions: ["Basic computer networking knowledge is helpful"],
    videoId: "M988_fsOSWo",
    curriculum: [
      ["Cloud Foundations", ["What Is Cloud Computing?", "IaaS, PaaS and SaaS", "Regions and Availability Zones"]],
      ["Core Services", ["Compute and Virtual Machines", "Cloud Storage Concepts", "Networking Fundamentals"]],
      ["Security and Operations", ["Identity and Access Basics", "Monitoring and Cost Awareness", "Cloud Architecture Review"]],
    ],
  },
  {
    courseName: "Docker, CI/CD and DevOps",
    courseDescription: "Learn container fundamentals, Docker images, automated pipelines, and deployments.",
    whatYouWillLearn: "Understand containers and the steps in a basic CI/CD workflow.",
    price: 1199,
    tag: ["Docker", "DevOps", "CI/CD"],
    category: "Cloud & DevOps",
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=900",
    instructions: ["Basic command-line usage recommended"],
    videoId: "3c-iBn73dDE",
    curriculum: [
      ["DevOps and Containers", ["What Is DevOps?", "Containers and Images", "Running Containers"]],
      ["Docker Workflows", ["Writing a Dockerfile", "Ports, Volumes and Networks", "Docker Compose Basics"]],
      ["CI/CD Fundamentals", ["Automated Build and Test", "Deployment Workflow", "DevOps Project Review"]],
    ],
  },
  {
    courseName: "Git and GitHub for Developers",
    courseDescription: "Learn commits, branches, merges, pull requests, and collaborative workflows.",
    whatYouWillLearn: "Track code changes and collaborate on projects using Git and GitHub.",
    price: 399,
    tag: ["Git", "GitHub", "Developer Tools"],
    category: "Developer Tools",
    thumbnail: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=900",
    instructions: ["Have Git installed or use an online environment"],
    videoId: "RGOj5yH7evk",
    curriculum: [
      ["Git Essentials", ["What Is Version Control?", "Initialize and Track Files", "Commits and History"]],
      ["Branching and Collaboration", ["Branches and Merging", "Remote Repositories", "Pull Requests and Code Review"]],
      ["Practical Git Workflows", ["Resolving Merge Conflicts", "Using .gitignore", "Publish a Portfolio Repository"]],
    ],
  },
  {
    courseName: "Backend Engineering with Node.js",
    courseDescription: "Create REST APIs with Express, validation, authentication, and database integration.",
    whatYouWillLearn: "Build and debug maintainable Node.js backend services.",
    price: 1099,
    tag: ["Node.js", "Express", "Backend"],
    category: "Web Development",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900",
    instructions: ["Basic JavaScript knowledge recommended"],
    videoId: "Oe421EPjeBE",
    curriculum: [
      ["Node.js Essentials", ["Node Runtime and npm", "Modules and Async JavaScript", "Environment Variables"]],
      ["Express API Development", ["Routes and Controllers", "Middleware and Validation", "REST API Design"]],
      ["Persistence and Security", ["MongoDB and Mongoose", "Authentication and Authorization", "API Testing and Deployment"]],
    ],
  },
  {
    courseName: "Competitive Programming Essentials",
    courseDescription: "Practice problem-solving strategies, greedy algorithms, binary search, and graph techniques.",
    whatYouWillLearn: "Analyze problems and select appropriate algorithmic approaches.",
    price: 1199,
    tag: ["Competitive Programming", "Algorithms", "DSA"],
    category: "DSA",
    thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=900",
    instructions: ["Comfort with one programming language recommended"],
    videoId: "B31LgI4Y4DQ",
    curriculum: [
      ["Contest Foundations", ["Reading Problems and Constraints", "Complexity and Implementation", "Prefix Sums and Two Pointers"]],
      ["Core Techniques", ["Binary Search Patterns", "Greedy Algorithms", "Recursion and Backtracking"]],
      ["Advanced Practice", ["Dynamic Programming Introduction", "Graph Problem Patterns", "Contest Review and Debugging"]],
    ],
  },
  {
    courseName: "SQL and Database Design",
    courseDescription: "Learn SQL queries, joins, aggregation, subqueries, and relational database design.",
    whatYouWillLearn: "Write SQL queries and understand database normalization and relationships.",
    price: 699,
    tag: ["SQL", "Database", "Queries"],
    category: "Databases",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=900",
    instructions: ["No prior SQL experience required"],
    videoId: "HXV3zeQKqGY",
    curriculum: [
      ["SQL Essentials", ["Tables and SELECT", "Filtering and Sorting", "INSERT, UPDATE and DELETE"]],
      ["Relationships and Aggregation", ["Aggregate Functions", "SQL JOINs", "Subqueries and Constraints"]],
      ["Database Design", ["Normalization Basics", "Keys and Relationships", "Mini Database Project"]],
    ],
  },
];

// Create/reuse sections and lectures for each course.

async function seedCurriculum(course, item) {
  await course.populate("courseContent");

  const existingSections = course.courseContent || [];
  const sectionIds = existingSections.map((section) => section._id);

  for (
    let sectionIndex = 0;
    sectionIndex < item.curriculum.length;
    sectionIndex++
  ) {
    const [sectionName, lectureTitles] = item.curriculum[sectionIndex];

    let section = existingSections.find(
      (section) => section.sectionName === sectionName
    );

    if (!section) {
      section = await Section.create({
        sectionName,
        subSection: [],
      });

      existingSections.push(section);
      sectionIds.push(section._id);
    }

    const existingLectures = await SubSection.find({
      _id: { $in: section.subSection || [] },
    });

    // Find existing lectures by title, ignoring capitalization.
    const existingTitles = new Map(
      existingLectures.map((lecture) => [
        lecture.title.trim().toLowerCase(),
        lecture,
      ])
    );

    for (let lectureIndex = 0; lectureIndex < lectureTitles.length; lectureIndex++) {
      const lectureData = lectureTitles[lectureIndex];

      // Support both old strings and new lecture objects.
      const title =
        typeof lectureData === "string"
          ? lectureData
          : lectureData?.title;

      const videoId =
        typeof lectureData === "object" && lectureData !== null
          ? lectureData.videoId || ""
          : "";

      if (typeof title !== "string" || !title.trim()) {
        console.warn("Skipping invalid lecture:", lectureData);
        continue;
      }

      const cleanTitle = title.trim();
      const normalizedTitle = cleanTitle.toLowerCase();

      // Use the video ID belonging to this particular lecture.
      const videoUrl = videoId.trim()
        ? `https://www.youtube.com/embed/${videoId.trim()}`
        : "";

      const existingLecture = existingTitles.get(normalizedTitle);

      if (existingLecture) {
        // Update existing lectures so they can receive their video URL.
        let needsUpdate = false;

        if (videoUrl && existingLecture.videoUrl !== videoUrl) {
          existingLecture.videoUrl = videoUrl;
          needsUpdate = true;
        }

        if (
          !existingLecture.description ||
          existingLecture.description.trim() === ""
        ) {
          existingLecture.description =
            `Learn the key concepts of ${cleanTitle} with explanations and practical examples.`;
          needsUpdate = true;
        }

        if (needsUpdate) {
          await existingLecture.save();
          console.log(`Updated lecture: ${cleanTitle}`);
        }

        continue;
      }

      const description =
        `Learn the key concepts of ${cleanTitle} with explanations and practical examples.`;

      const lecture = await SubSection.create({
        title: cleanTitle,
        description,
        timeDuration: "10:00",
        videoUrl,
      });

      section.subSection.push(lecture._id);
      existingTitles.set(normalizedTitle, lecture);

      console.log(`Created lecture: ${cleanTitle}`);
    }

    await section.save();
  }

  course.courseContent = sectionIds;
  await course.save();
}


async function seedCourses() {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is missing from your .env file");
    }

    if (!DEMO_PASSWORD || DEMO_PASSWORD.length < 12) {
      throw new Error(
        "Set DEMO_INSTRUCTOR_PASSWORD to a strong password of at least 12 characters in .env"
      );
    }

    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected");

    const password = await bcrypt.hash(DEMO_PASSWORD, 10);
    const instructorMap = new Map();

    // Create or reuse demo instructors.
    for (const instructor of instructors) {
      let user = await User.findOne({ email: instructor.email });

      if (!user) {
        const profile = await Profile.create({
          about: instructor.about,
        });

        user = await User.create({
          firstName: instructor.firstName,
          lastName: instructor.lastName,
          email: instructor.email,
          password,
          accountType: "Instructor",
          active: true,
          approved: true,
          additionalDetails: profile._id,
          courses: [],
          image: instructor.image,
        });

        console.log("Created instructor:", instructor.email);
      } else if (user.accountType !== "Instructor") {
        throw new Error(
          `${instructor.email} exists but is not an instructor`
        );
      }

      instructorMap.set(instructor.email, user);
    }

    // Create or reuse categories.
    const categoryMap = new Map();

    for (const name of categoryNames) {
      let category = await Category.findOne({ name });

      if (!category) {
        category = await Category.create({
          name,
          description: `${name} courses on EduVerse`,
          courses: [],
        });

        console.log("Created category:", name);
      }

      categoryMap.set(name, category);
    }

    // Map each course to its assigned instructor.
    const courseInstructor = new Map();

    for (const instructor of instructors) {
      for (const name of instructor.courseNames) {
        courseInstructor.set(name, instructor.email);
      }
    }

    // Create or reuse courses, then seed their curriculum.
    for (const item of courses) {
      const instructorEmail = courseInstructor.get(item.courseName);

      if (!instructorEmail) {
        throw new Error(`No instructor assigned to: ${item.courseName}`);
      }

      const instructor = instructorMap.get(instructorEmail);
      const category = categoryMap.get(item.category);

      let course = await Course.findOne({
        courseName: item.courseName,
      });

      if (!course) {
        course = await Course.create({
          courseName: item.courseName,
          courseDescription: item.courseDescription,
          instructor: instructor._id,
          whatYouWillLearn: item.whatYouWillLearn,
          price: item.price,
          tag: item.tag,
          category: category._id,
          thumbnail: item.thumbnail,
          instructions: item.instructions,
          courseContent: [],
          ratingAndReviews: [],
          studentsEnrolled: [],
          status: "Published",
        });

        console.log("Created course:", item.courseName);
      } else {
        // Preserve existing course details but repair missing relationships.
        if (!course.instructor) course.instructor = instructor._id;
        course.category = category._id;

        if (!course.tag || course.tag.length === 0) {
          course.tag = item.tag;
        }

        if (!course.whatYouWillLearn) {
          course.whatYouWillLearn = item.whatYouWillLearn;
        }

        await course.save();
        console.log("Reusing course:", item.courseName);
      }

      await User.updateOne(
        { _id: instructor._id },
        { $addToSet: { courses: course._id } }
      );

      await Category.updateOne(
        { _id: category._id },
        { $addToSet: { courses: course._id } }
      );

      await seedCurriculum(course, item);

      console.log("Curriculum ready:", item.courseName);
    }

    console.log("\nEduVerse seeding completed!");
    console.log(`Courses processed: ${courses.length}`);
    console.log("Each course has 3 sections and 9 starter lectures.");

    console.log("\nDemo instructor emails:");
    instructors.forEach((instructor) => {
      console.log(`- ${instructor.email}`);
    });

    console.log(
      "\nNew demo instructors use DEMO_INSTRUCTOR_PASSWORD from .env."
    );
    console.log("Existing instructor passwords are not changed.");
    console.log("Test video URLs before publishing.");
  } finally {
    await mongoose.disconnect();
  }
}

seedCourses().catch((error) => {
  console.error("Seed failed:", error);
  process.exitCode = 1;
});
