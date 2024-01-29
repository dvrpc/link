import makeAuthenticatedRequest from "../Authentication/Api";

function sanitizeName(name) {
  return name.replace(/[^a-zA-Z0-9 ]/g, "");
}

export async function getGeometries(
  setGeojsonData,
  connectionType,
  study,
  user,
) {
  try {
    const sanitizedStudy = sanitizeName(study);
    let schema;
    if (connectionType === "bike") {
      schema = "lts";
    } else if (connectionType === "pedestrian") {
      schema = "sidewalk";
    }

    const response = await makeAuthenticatedRequest(
      `${process.env.REACT_APP_API_URL}/get_user_study_geoms?username=${user}&study=${sanitizedStudy}&schema=${schema}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    setGeojsonData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getSegments(
  setUserSegmentData,
  connectionType,
  study,
  user,
) {
  try {
    const sanitizedStudy = sanitizeName(study);
    let schema;
    if (connectionType === "bike") {
      schema = "lts";
    } else if (connectionType === "pedestrian") {
      schema = "sidewalk";
    }

    const response = await makeAuthenticatedRequest(
      `${process.env.REACT_APP_API_URL}/get_user_segment?username=${user}&study=${sanitizedStudy}&schema=${schema}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    setUserSegmentData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
