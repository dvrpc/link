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

export const handleDelete = async (seg_name, username, connectionType) => {
  const schema = connectionType === "bike" ? "lts" : "sidewalk";
  try {
    const response = await makeAuthenticatedRequest(
      `${process.env.REACT_APP_API_URL}/delete?username=${username}&seg_name=${seg_name}&schema=${schema}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 200) {
      const data = await response.json();
      console.log("Server response:", data);
    } else {
      console.log("Error:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

export const handleShareSwitch = async (connectionType, username, seg_name, isShared, setIsShared) => {
  try {
    const schema = connectionType === "bike" ? "lts" : "sidewalk";
    const newSharedState = !isShared;

    const response = await makeAuthenticatedRequest(
      `${process.env.REACT_APP_API_URL}/share?username=${username}&seg_name=${seg_name}&schema=${schema}&shared=${newSharedState}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 200) {
      const updatedData = await response.json();
      console.log("Server response:", updatedData);
      setIsShared(newSharedState);
    } else {
      console.log("Error:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

export async function handleRename(connectionType, segName, username, newName) {
  try {
    const schema = connectionType === "bike" ? "lts" : "sidewalk";
    const response = await makeAuthenticatedRequest(
      `${process.env.REACT_APP_API_URL}/rename?username=${username}&schema=${schema}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldName: segName,
          newName: newName,
        }),
      }
    );
    const data = await response.json();
    console.log("Rename successful:", data);
  } catch (error) {
    console.error("Error during rename:", error.message);
    alert(`Error: ${error.message}`);
  }
};
