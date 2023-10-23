import React, { createContext, useContext, useState } from "react";

export const MapContext = createContext(null);

export const useMap = () => {
  return useContext(MapContext);
};
