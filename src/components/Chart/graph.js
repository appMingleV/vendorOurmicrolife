import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "January", currentYear: 20000, lastYear: 10000 },
  { month: "March", currentYear: 30000, lastYear: 15000 },
  { month: "May", currentYear: 40000, lastYear: 20000 },
  { month: "July", currentYear: 50000, lastYear: 30000 },
  { month: "September", currentYear: 45000, lastYear: 35000 },
  { month: "December", currentYear: 60000, lastYear: 40000 },
];

const SalesTrendChart = () => {
  return (
    <div style={{ width: "60%", height: 400, background: "#fff", borderRadius: "12px", padding: "16px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Sales Trend</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `${value.toLocaleString()} K`} />
          <Legend verticalAlign="top" align="right" />
          <Line type="monotone" dataKey="currentYear" stroke="#7c4dff" strokeWidth={2} dot={{ r: 5 }} />
          <Line type="monotone" dataKey="lastYear" stroke="#ff4d4d" strokeWidth={2} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesTrendChart;
