import makeAuthenticatedRequest from "../Authentication/Api";

export const downloadGeojson = async (segName, user, connectionType) => {
  const schema = connectionType === "bike" ? "lts" : "sidewalk";
  try {
    const response = await makeAuthenticatedRequest(
      `${process.env.REACT_APP_API_URL}/download_user_study_geoms?username=${user}&study=${segName}&schema=${schema}`,
      { method: "GET" },
    );

    if (response.ok) {
      const blob = await response.blob();
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = `${segName}_${schema}_link_tool_geoms.zip`;

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
        if (filenameMatch) filename = filenameMatch[1];
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } else {
      console.error("Failed to fetch the file:", response.statusText);
    }
  } catch (error) {
    console.error("There was an error downloading the file:", error);
  }
};



