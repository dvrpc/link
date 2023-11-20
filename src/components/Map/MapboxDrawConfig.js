import MapboxDraw from "@mapbox/mapbox-gl-draw";

const drawInstance = new MapboxDraw({
  displayControlsDefault: false,
  // Select which mapbox-gl-draw control buttons to add to the map.
  controls: {
    line_string: true,
    trash: true,
    combine_features: true,
    uncombine_features: true,
  },
  defaultMode: "simple_select",
  styles: [
    // ACTIVE (being drawn)
    // line stroke
    {
      id: "gl-draw-line",
      type: "line",
      filter: ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#40E0D0",
        "line-dasharray": [0.2, 2],
        "line-width": 2,
      },
    },
    // vertex point halos
    {
      id: "gl-draw-polygon-and-line-vertex-halo-active",
      type: "circle",
      filter: [
        "all",
        ["==", "meta", "vertex"],
        ["==", "$type", "Point"],
        ["!=", "mode", "static"],
      ],
      paint: {
        "circle-radius": 5,
        "circle-color": "#FFF",
      },
    },
    // vertex points
    {
      id: "gl-draw-polygon-and-line-vertex-active",
      type: "circle",
      filter: [
        "all",
        ["==", "meta", "vertex"],
        ["==", "$type", "Point"],
        ["!=", "mode", "simple_select"],
      ],
      paint: {
        "circle-radius": 3,
        "circle-color": "#D20C0C",
      },
    },

    // INACTIVE (static, already drawn)
    // line stroke
    {
      id: "gl-draw-line-static",
      type: "line",
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "mode", "simple_select"],
      ],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#4682B4",
        "line-width": 3,
      },
    },
    // polygon fill
    {
      id: "gl-draw-polygon-fill-static",
      type: "fill",
      filter: ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
      paint: {
        "fill-color": "#000",
        "fill-outline-color": "#000",
        "fill-opacity": 0.1,
      },
    },
    // polygon outline
    {
      id: "gl-draw-polygon-stroke-static",
      type: "line",
      filter: ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#000",
        "line-width": 3,
      },
    },
  ],
});
export default drawInstance;
