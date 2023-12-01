import mapboxgl from "mapbox-gl";

export class SelectAllButton {
  constructor(drawInstance) {
    this.drawInstance = drawInstance;
  }

  onAdd(map) {
    this.map = map;
    this.container = document.createElement("div");
    this.container.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
    const button = document.createElement("button");
    button.className = "mapbox-gl-draw_ctrl-draw-btn";
    button.title = "Select all drawn segments";
    button.textContent = "S";
    button.style.color = "black";
    button.style.fontSize = "22px";

    button.onclick = () => this.selectAll();
    this.container.appendChild(button);
    return this.container;
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }

  selectAll() {
    const allFeatures = this.drawInstance.getAll();
    const allFeatureIds = allFeatures.features.map((feature) => feature.id);
    this.drawInstance.changeMode("simple_select", {
      featureIds: allFeatureIds,
    });
  }
}
