import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SharedStudy = ({
  username: propUsername,
  schema: propSchema,
  studyId,
}) => {
  const { user } = useAuth0();
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authUsername = user?.nickname || propUsername;
    let resolvedSchema = propSchema;
    if (resolvedSchema === "bike") {
      resolvedSchema = "lts";
    } else if (resolvedSchema === "pedestrian") {
      resolvedSchema = "sidewalk";
    }

    const fetchStudy = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/get_user_studies/?username=${authUsername}&schema=${resolvedSchema}&study_name=${studyId}`,
        );
        if (!response.ok) throw new Error("Study not found");
        const data = await response.json();
        console.log(data.studies[0].shared);
        if (!data.studies[0].shared) throw new Error("Study not shared");
        setStudy(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudy();
  }, [user, propUsername, propSchema, studyId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      {study && (
        <div>
          <h2>Study Name: {study.studies[0].seg_name}</h2>
          <p>
            <strong>Username:</strong> {study.studies[0].username}
          </p>
          <p>
            <strong>Has Isochrone:</strong>{" "}
            {study.studies[0].has_isochrone ? "Yes" : "No"}
          </p>
          <p>
            <strong>Miles:</strong> {study.studies[0].miles}
          </p>
        </div>
      )}
    </div>
  );
};

export default SharedStudy;
