import React from "react";
import { Alert, Flex, Spin } from "antd";
const Loading = () => (
  <div className="loading">
    <Spin size="large">
      <div className="content" />
    </Spin>
  </div>
);
export default Loading;
