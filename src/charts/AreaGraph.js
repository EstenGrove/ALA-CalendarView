import React from "react";
import {
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";
import styles from "../css/AreaGraph.module.scss";

const AreaGraph = props => {
  return (
    <div className={styles.AreaGraph}>
      <h3>Filled Line Graph</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={600} height={300} data={[""]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="duotone"
            dataKey="bloodpressure"
            stroke="#8884d8"
            fill="#8884d8"
            margin={{ top: 50, right: 5, bottom: 5, left: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default AreaGraph;
