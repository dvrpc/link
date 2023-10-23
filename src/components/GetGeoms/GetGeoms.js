import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, Group } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";

function GetGeoms({ closeFunction, connectionType }) {
  const { user } = useAuth0();
  console.log(closeFunction);

  const getGeometries = async () => {
    try {
      const username = user.nickname;
      if (connectionType === "bike") {
        var schema = "lts";
      } else if (connectionType === "pedestrian") {
        var schema = "sidewalk";
      }

      const response = await fetch(
        `http://localhost:8000/get_user_studies?username=${username}&schema=${schema}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      if (data["studies"][0] === "No studies have been created yet!") {
        console.log("this is just a placeholder");
      } else {
        console.log("this is just a placeholder too!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // open();
  };

  return (
    <>
      <Button onClick={closeFunction}>View Study</Button>
    </>
  );
}

export default GetGeoms;
