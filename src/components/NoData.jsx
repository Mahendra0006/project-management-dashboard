import React from "react";

const NoData = ({ message = "No data found", imageUrl }) => {
  return (
    <div className="text-center" style={{ marginTop: "100px" }}>
      <img
        src={
          imageUrl || "https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        }
        alt="No data"
        className="mb-4"
        style={{ width: "150px", opacity: 0.7 }}
      />
      <h4 className="text-muted">{message}</h4>
    </div>
  );
};

export default NoData;
