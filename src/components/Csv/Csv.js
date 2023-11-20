import React from "react";
import { Button } from "@mantine/core";

function CsvButton({ schema, username }) {
  const getCsv = async () => {
    const endpointSchema = schema === "bike" ? "lts" : "sidewalk";
    try {
      const response = await fetch(
        `http://localhost:8000/get-csv/?schema=${endpointSchema}&username=${username}`,
        {
          method: "GET",
        },
      );

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = `${username}_data.csv`;
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to fetch the CSV file:", response.statusText);
      }
    } catch (error) {
      console.error("There was an error downloading the CSV file:", error);
    }
  };

  return <Button onClick={getCsv}>Download CSV</Button>;
}

export default CsvButton;
