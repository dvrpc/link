var featurelist = [];

export function setupClick(map, connectionType) {
  if (connectionType === "bike") {
    setupLayerClick(map, "lts", "lts_tile", "existing_conditions_lts");
  } else if (connectionType === "sw") {
    setupLayerClick(map, "sw", "sw_tile", "ped_lines");
  }
}

function setupLayerClick(map, layerId, source, sourceLayer) {
  map.on("click", "clicked", (e) => {
    e.features.forEach((feature) => {
      if (featurelist.includes(feature.id)) {
        var index = featurelist.indexOf(feature.id);
        if (index > -1) {
          featurelist.splice(index, 1);
        }
        map.setFeatureState(
          {
            source: source,
            id: feature.id,
            sourceLayer: sourceLayer,
          },
          { click: false },
        );
      } else {
        featurelist.push(feature.id);
        map.setFeatureState(
          {
            source: source,
            id: feature.id,
            sourceLayer: sourceLayer,
          },
          { click: true },
        );
      }
      document.getElementById("segids").innerHTML = `${featurelist}`;
    });
  });
}

export function clickClear(map, featurelist, setFeatureList, segIdsElement) {
  console.log(featurelist);
  segIdsElement.innerHTML = [];
  for (const element of featurelist) {
    map.setFeatureState(
      {
        source: "lts_tile",
        id: element,
        sourceLayer: "existing_conditions_lts",
      },
      { click: false },
    );
  }

  // Reset featurelist
  setFeatureList([]);
}
