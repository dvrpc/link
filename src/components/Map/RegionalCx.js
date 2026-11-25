import React, { useCallback, useEffect, useRef, useState } from "react";
import RegionalHeader from "./RegionalHeader";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const COLORS = [
  "#474ED7", // Low (blue)
  "#6B4FCB",
  "#8E50C0",
  "#B051B4",
  "#D351A9",
  "#EC458D", // Middle (pink)
  "#EF6E97",
  "#F296A2",
  "#F5BFAE",
  "#FFF4CA", // High (light yellow)
];

const RegionalCx = ({ themeType, isLoading, setIsLoading }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const featuresByIdRef = useRef(new Map());
  const counties = [
    "DVRPC Region (All Counties)",
    "Bucks",
    "Burlington",
    "Camden",
    "Chester",
    "Delaware",
    "Gloucester",
    "Mercer",
    "Montgomery",
    "Philadelphia",
  ];
  const attributes = [
    "total_pop",
    "total_jobs",
    "miles",
    "disabled",
    "ethnic_minority",
    "female",
    "foreign_born",
    "lep",
    "low_income",
    "older_adult",
    "racial_minority",
    "youth",
  ];
  const [currentCounty, setCurrentCounty] = useState(
    "DVRPC Region (All Counties)",
  );
  const [currentAttribute, setCurrentAttribute] = useState("total_pop");
  const currentAttributeRef = useRef(currentAttribute);
  const currentCountyRef = useRef(currentCounty);

  const buildColorStops = useCallback((attribute, county) => {
    const features = Array.from(featuresByIdRef.current.values());
    const values = features
      .filter(
        (feature) =>
          !county ||
          county === "DVRPC Region (All Counties)" ||
          feature.properties.co_name === county,
      )
      .map((feature) => feature.properties[attribute])
      .filter((value) => value !== null && value !== undefined)
      .sort((a, b) => a - b);

    if (values.length === 0) {
      return [];
    }

    const quantiles = Array.from({ length: 10 }, (_, i) => {
      const index = Math.floor(((i + 1) * values.length) / 10) - 1;
      return values[index];
    });

    const colorStops = [];
    quantiles.forEach((quantile, index) => {
      if (
        colorStops.length === 0 ||
        quantile > colorStops[colorStops.length - 1][0]
      ) {
        colorStops.push([quantile, COLORS[index]]);
      }
    });

    return colorStops;
  }, []);

  const applyStyle = useCallback(
    (map, attribute, county) => {
      const colorStops = buildColorStops(attribute, county);

      if (colorStops.length === 1) {
        map.setPaintProperty("region", "line-color", colorStops[0][1]);
      } else if (colorStops.length > 1) {
        map.setPaintProperty("region", "line-color", {
          property: attribute,
          stops: colorStops,
        });
      }

      if (county && county !== "DVRPC Region (All Counties)") {
        map.setFilter("region", ["==", ["get", "co_name"], county]);
      } else {
        map.setFilter("region", null);
      }
    },
    [buildColorStops],
  );

  useEffect(() => {
    currentAttributeRef.current = currentAttribute;
    currentCountyRef.current = currentCounty;
  }, [currentAttribute, currentCounty]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style:
        themeType === "dark"
          ? "mapbox://styles/mapbox/dark-v11"
          : "mapbox://styles/mapbox/light-v11",
      center: [-75.233, 40.07],
      zoom: 8.43,
    });

    mapInstance.current = map;

    map.on("load", () => {
      map.addSource("regional", {
        type: "vector",
        url: "https://tiles.dvrpc.org/data/transportation/lts_v3_regional_analysis",
        minzoom: 0,
        maxzoom: 16,
      });

      map.addLayer(
        {
          id: "region",
          type: "line",
          source: "regional",
          "source-layer": "lts_v3_regional_analysis",
          paint: {
            "line-width": 2,
            "line-color": COLORS[0],
          },
        },
        "road-label-simple",
      );

      let initialViewSet = false;
      let styleApplied = false;

      map.on("idle", () => {
        const previousCount = featuresByIdRef.current.size;
        const features = map.querySourceFeatures("regional", {
          sourceLayer: "lts_v3_regional_analysis",
        });

        features.forEach((feature) => {
          const id = feature.properties?.id ?? feature.id;
          if (id !== undefined && id !== null) {
            featuresByIdRef.current.set(id, feature);
          }
        });

        if (!styleApplied || featuresByIdRef.current.size !== previousCount) {
          styleApplied = true;
          applyStyle(
            map,
            currentAttributeRef.current,
            currentCountyRef.current,
          );
        }

        if (!initialViewSet) {
          initialViewSet = true;
          map.jumpTo({ center: [-75.233, 40.07], zoom: 8.43 });
        }
      });

      map.fitBounds(
        [
          [-76.096387, 39.517394],
          [-74.370284, 40.618139],
        ],
        { padding: 20, animate: false },
      );

      map.on("click", "region", (e) => {
        const coordinates = e.lngLat;
        const properties = e.features[0].properties;
        const propertyLabels = {
          objectid: "Object ID",
          co_name: "County Name",
          name: "Name",
          id: "ID",
          username: "Username",
          network_type: "Network Type",
          miles: "Miles of low stress islands connected",
          total_pop: "Total Population",
          disabled: "Disabled Population",
          ethnic_minority: "Ethnic Minority Population",
          female: "Female Population",
          foreign_born: "Foreign-Born Population",
          lep: "Limited English Proficiency (LEP)",
          low_income: "Low-Income Population",
          older_adult: "Older Adult Population",
          racial_minority: "Racial Minority Population",
          youth: "Youth Population",
          total_jobs: "Total Jobs",
        };

        const propertiesToOmit = [
          "objectid",
          "id",
          "username",
          "name",
          "network_type",
        ];

        const popupContent = Object.keys(properties)
          .filter((key) => !propertiesToOmit.includes(key))
          .map((key) => {
            const label = propertyLabels[key] || key;

            const value =
              typeof properties[key] === "number"
                ? properties[key].toLocaleString()
                : properties[key];

            return `<strong>${label}:</strong> ${value}`;
          })
          .join("<br>");

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<div style="color: black;">${popupContent}</div>`)
          .addTo(map);
      });

      map.on("mouseenter", "region", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "region", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    return () => map.remove();
  }, [themeType, applyStyle]);
  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !map.getLayer("region")) return;

    applyStyle(map, currentAttribute, currentCounty);
  }, [currentAttribute, currentCounty, applyStyle]);

  return (
    <>
      <div className="parent">
        <RegionalHeader
          counties={counties}
          attributes={attributes}
          setCurrentCounty={setCurrentCounty}
          setCurrentAttribute={setCurrentAttribute}
        />
        <div
          ref={mapContainer}
          className="regional-map-container"
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "rgb(44, 76, 76)",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex" }}>
                {COLORS.map((color) => (
                  <div
                    key={color}
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: color,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: "5px",
                }}
              >
                <span style={{ color: "white" }}>Low</span>
                <span style={{ color: "white" }}>High</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegionalCx;
