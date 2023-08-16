import React from 'react';

function ConnectionToggle({connectionType, setConnectionType}) {
  const handleToggle = () => {
    setConnectionType(prevType => prevType === 'bike' ? 'pedestrian' : 'bike');
  };
  return (
  <button onClick={handleToggle}>
      Switch to {connectionType === 'bike' ? 'Pedestrian' : 'Bike'} Connection
  </button>
  );
}

export default ConnectionToggle;
