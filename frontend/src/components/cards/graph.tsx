// components/Graph.tsx
"use client";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface GraphProps {
  data: { name: string; value: number }[];
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#007bff" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
