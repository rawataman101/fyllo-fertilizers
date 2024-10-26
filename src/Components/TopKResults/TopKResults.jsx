import React from "react";
import "./TopKResults.css";
function TopKResults({ item, index }) {
  return (
    <div className="topKResultsWrapper">
      {index + 1}. {item}
    </div>
  );
}

export default TopKResults;
