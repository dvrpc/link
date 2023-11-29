import React, { createContext, useContext, useState } from "react";

export const MapContext = createContext({
  map: null,
  draw: null,
  updateDrawingState: () => {},
});

export const useMap = () => {
  return useContext(MapContext);
};
