"use client";
import { useParams } from "next/navigation";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Page = () => {
  const params = useParams();
  const { id } = params;

  const metrics = {
    workingHours: 40,
    completedTasks: 25,
    pendingTasks: 5,
    performanceScore: 85, 
  };


  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Working Hours",
        data: [8, 7, 8, 6, 8, 5, 7],
        backgroundColor: "#4caf50", 
        borderColor: "#388e3c", 
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="pt-7 pl-2 flex justify-center">
      <div className=" rounded-lg shadow-lg bg-white p-6">
      
        <div className="flex items-center space-x-4">
          <img
            src={`/images/${id}.jpeg`}
            alt={`${id}'s photo`}
            className="w-28 h-28 rounded-full border-2 border-gray-300 object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{id}</h2>
            <p className="text-sm text-gray-500 mt-1">Software Engineer</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-[200px]">
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 rounded-md text-center">
            <h3 className="text-lg font-medium text-gray-700">{metrics.workingHours} hrs</h3>
            <p className="text-sm text-gray-500">Working Hours</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md text-center">
            <h3 className="text-lg font-medium text-gray-700">{metrics.completedTasks}</h3>
            <p className="text-sm text-gray-500">Completed Tasks</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md text-center">
            <h3 className="text-lg font-medium text-gray-700">{metrics.pendingTasks}</h3>
            <p className="text-sm text-gray-500">Pending Tasks</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md text-center">
            <h3 className="text-lg font-medium text-gray-700">{metrics.performanceScore}%</h3>
            <p className="text-sm text-gray-500">Performance Score</p>
          </div>
        </div>

     
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800">Working Hours (This Week)</h4>
          <div className="mt-4">
            <Bar data={chartData} options={{ responsive: true }} />
          </div>
        </div>

        </div>
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800">About</h4>
          <p className="text-sm text-gray-600 mt-2">
            {id} is a dedicated and hardworking software engineer with a proven
            track record of completing complex projects on time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
