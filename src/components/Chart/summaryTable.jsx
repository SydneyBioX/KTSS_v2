import React, { useState, useEffect } from "react";

export const SummaryTable = ({ data }) => {
  // Step 1: Calculate avgVariability
  const getAvgVariability = (data) => {
    const means = data.map((item) => {
      const meanValue = (item.predictsurvprob/100 + item.kidney_quality/100) / 2;
      return meanValue;
    });
    const avgVariability = means.reduce((sum, mean) => sum + mean, 0) / means.length;
    return avgVariability;
  };

  // Step 2: Compute variability for each entry
  const calculateVariability = (data, avgVariability) => {
    return data.map((item) => {
      const rowMean = (item.predictsurvprob/100 + item.kidney_quality/100) / 2;
      const variability = Math.abs(rowMean - avgVariability);
      return { ...item, variability }; // Add variability to each item
    });
  };

  // Step 3: Compute the average variability and the updated dataset
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const avgVariability = getAvgVariability(data);
    const updatedData = calculateVariability(data, avgVariability);
    setTableData(updatedData.reverse());
  }, [data]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Summary Table</h2>
      <table className="border-collapse border border-gray-300 w-[600px]">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Offer</th>
            <th className="border border-gray-300 px-4 py-2">Kidney Quality</th>
            <th className="border border-gray-300 px-4 py-2">Wait time</th>
            <th className="border border-gray-300 px-4 py-2">Graft Survival Prob.</th>
            <th className="border border-gray-300 px-4 py-2">Variability</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} className="border-t border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{row.offer}</td>
              <td className="border border-gray-300 px-4 py-2">{row.kidney_quality}</td>
              <td className="border border-gray-300 px-4 py-2">{row.wait_time}</td>
              <td className="border border-gray-300 px-4 py-2">{row.predictsurvprob}</td>
              <td className="border border-gray-300 px-4 py-2">{row.variability.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



