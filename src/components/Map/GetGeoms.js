export async function getGeometries(
  setGeojsonData,
  connectionType,
  study,
  user,
) {
  try {
    let schema;
    if (connectionType === "bike") {
      schema = "lts";
    } else if (connectionType === "pedestrian") {
      schema = "sidewalk";
    }

    const response = await fetch(
      `http://localhost:8000/get_user_study_geoms?username=${user}&study=${study}&schema=${schema}`,
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
