<!-- <script src="https://unpkg.com/maplibre-gl@4.7.0/dist/maplibre-gl.js"></script> -->
<script setup>
import { MainButton, useWebAppPopup } from "vue-tg";

const { showAlert } = useWebAppPopup();

const map = new maplibregl.Map({
  container: "map",
  style:
    "https://api.maptiler.com/maps/streets/style.json?key=qi2lqLtmvCDiZ8epFXyx",
  center: [44.51589138755775, 48.712369267537824],
  zoom: 0.1,
});

const images = {
  popup: "https://maplibre.org/maplibre-gl-js/docs/assets/popup.png",
  "popup-debug":
    "https://maplibre.org/maplibre-gl-js/docs/assets/popup_debug.png",
};

map.on("load", async () => {
  const debugPopup = await map.loadImage(images["popup-debug"]);
  const popup = await map.loadImage(images["popup"]);
  map.addImage("popup-debug", debugPopup.data, {
    // The two (blue) columns of pixels that can be stretched horizontally:
    //   - the pixels between x: 25 and x: 55 can be stretched
    //   - the pixels between x: 85 and x: 115 can be stretched.

    // The one (red) row of pixels that can be stretched vertically:
    //   - the pixels between y: 25 and y: 100 can be stretched

    // This part of the image that can contain text ([x1, y1, x2, y2]):
    content: [25, 25, 115, 100],
    // This is a high-dpi image:
  });

  map.addSource("points", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [44.51589138755775, 48.712369267537824],
          },
          properties: {
            "image-name": "popup-debug",
            name: "остановка",
          },
        },
      ],
    },
  });
  map.addLayer({
    id: "points",
    type: "symbol",
    source: "points",
    layout: {
      "text-field": ["get", "name"],
    },
  });

  // the original, unstretched image for comparison
});
</script>

<template>
  <div id="map"></div>
</template>
