
import React, { useMemo, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

export default function InstructorChart({ courses = [] }) {
    const [currChart, setCurrChart] = useState("students");

    // Generate chart colors
    const generateRandomColors = (numColors) => {
        const colors = [];

        for (let i = 0; i < numColors; i++) {
            const color = `rgb(
                ${Math.floor(Math.random() * 256)},
                ${Math.floor(Math.random() * 256)},
                ${Math.floor(Math.random() * 256)}
            )`;

            colors.push(color);
        }

        return colors;
    };

    // Keep colors stable while switching charts
    const backgroundColors = useMemo(
        () => generateRandomColors(courses.length),
        [courses.length]
    );

    // Student enrollment chart data
    const chartDataStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map(
                    (course) => course.totalStudentsEnrolled ?? 0
                ),
                backgroundColor: backgroundColors,
                borderColor: "#161D29",
                borderWidth: 2,
            },
        ],
    };

    // Income chart data
    const chartIncomeData = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map(
                    (course) => course.totalAmountGenerated ?? 0
                ),
                backgroundColor: backgroundColors,
                borderColor: "#161D29",
                borderWidth: 2,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "#F1F2FF",
                    padding: 16,
                    usePointStyle: true,
                },
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div className="flex min-w-0 flex-1 flex-col gap-y-4 overflow-hidden rounded-md bg-richblack-800 p-4 sm:p-6">
            <p className="text-lg font-bold text-richblack-5">
                Visualize
            </p>

            {/* Chart selection buttons */}
            <div className="flex flex-wrap gap-3 font-semibold">
                <button
                    type="button"
                    onClick={() => setCurrChart("students")}
                    className={`rounded-sm px-3 py-1 transition-all duration-200 ${
                        currChart === "students"
                            ? "bg-richblack-700 text-yellow-50"
                            : "text-yellow-400 hover:bg-richblack-700"
                    }`}
                >
                    Students
                </button>

                <button
                    type="button"
                    onClick={() => setCurrChart("income")}
                    className={`rounded-sm px-3 py-1 transition-all duration-200 ${
                        currChart === "income"
                            ? "bg-richblack-700 text-yellow-50"
                            : "text-yellow-400 hover:bg-richblack-700"
                    }`}
                >
                    Income
                </button>
            </div>

            {/* Chart container */}
            {courses.length === 0 ? (
                <div className="flex min-h-[250px] items-center justify-center text-center text-sm text-richblack-300">
                    No course data available to visualize yet.
                </div>
            ) : (
                <div className="relative mx-auto h-[280px] w-full max-w-[320px] min-w-0 sm:h-[320px] sm:max-w-[360px]">
                    <Pie
                        data={
                            currChart === "students"
                                ? chartDataStudents
                                : chartIncomeData
                        }
                        options={options}
                    />
                </div>
            )}
        </div>
    );
}
