import mapboxgl from "mapbox-gl";
import drawInstance from "./MapboxDrawConfig";

export class GeoJSONUploadControl {
  constructor(updateDrawingStateCallback) {
    this.updateDrawingStateCallback = updateDrawingStateCallback;
  }

  onAdd(map) {
    this.map = map;
    this.container = document.createElement("div");
    this.container.className = "mapboxgl-ctrl";
    const button = document.createElement("button");
    button.textContent = "Upload GeoJSON";
    button.onclick = () => this.uploadGeoJSON();
    this.container.appendChild(button);
    return this.container;
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }

  uploadGeoJSON() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".geojson";
    input.onchange = (e) => this.readFile(e.target.files[0]);
    input.click();
  }

  readFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => this.addToMap(e.target.result);
    reader.readAsText(file);
  }

  addToMap(geojsonString) {
    try {
      const geojson = JSON.parse(geojsonString);
      drawInstance.add(geojson);

      if (this.updateDrawingStateCallback) {
        this.updateDrawingStateCallback();
      }
    } catch (error) {
      console.error("Error adding GeoJSON to the map:", error);
    }
  }
}
