import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Sun", thisWeek: 8000, lastWeek: 6000 },
  { day: "Mon", thisWeek: 10000, lastWeek: 8000 },
  { day: "Tue", thisWeek: 12000, lastWeek: 9000 },
  { day: "Wed", thisWeek: 14000, lastWeek: 10000 },
  { day: "Thu", thisWeek: 15000, lastWeek: 12000 },
  { day: "Fri", thisWeek: 13000, lastWeek: 11000 },
  { day: "Sat", thisWeek: 14000, lastWeek: 12000 },
];

const ProductViewsChart = () => {
  return (
    <div className="w-full max-w-md p-6 bg-[#fff] rounded-lg shadow-md">
      <h3 className="text-center text-lg font-semibold text-gray-800 mb-4">Product Views</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="thisWeek" fill="#7c4dff" radius={[4, 4, 0, 0]} />
          <Bar dataKey="lastWeek" fill="#ff4d4d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductViewsChart;
