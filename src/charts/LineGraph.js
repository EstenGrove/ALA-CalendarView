import React, { useRef } from "react";
import { PropTypes } from "prop-types";
import {
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";

import styles from "../css/LineGraph.module.scss";

const LineGraph = ({ data }) => {
  const elRef = useRef();
  return (
    <div className={styles.graphWrapper} ref={elRef}>
      <h3>Blood Pressure</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={700}
          height={300}
          data={[""]}
          id={"line"}
          margin={{ top: 50, right: 5, bottom: 10, left: 5 }}
        >
          <Line
            type="monotone"
            dataKey="bloodpressure"
            stroke="#d7263d"
            dot={true}
            fill="#d7263d"
          />
          <CartesianGrid stroke="#5c75ea" opacity=".3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip payload={[""]} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default LineGraph;

LineGraph.propTypes = {
  data: PropTypes.array
};
