<script setup>
import { MainButton, useWebAppPopup } from "vue-tg";
import maplibregl from "maplibre-gl";
import { shallowRef, onMounted, onUnmounted, markRaw } from "vue";

const { showAlert } = useWebAppPopup();

const mapContainer = shallowRef(null);
// const map = shallowRef(null);

onMounted(() => {
  const map = new maplibregl.Map({
    container: mapContainer.value,
    style:
      "https://api.maptiler.com/maps/streets/style.json?key=qi2lqLtmvCDiZ8epFXyx",
    center: [44.515, 48.712],
    zoom: 7,
  });

  const geojsonData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-67.13734351262877, 45.137451890638886],
              [-66.96466, 44.8097],
              [-68.03252, 44.3252],
              [-69.06, 43.98],
              [-70.11617, 43.68405],
              [-70.64573401557249, 43.090083319667144],
              [-70.75102474636725, 43.08003225358635],
              [-70.79761105007827, 43.21973948828747],
              [-70.98176001655037, 43.36789581966826],
              [-70.94416541205806, 43.46633942318431],
              [-71.08482, 45.3052400000002],
              [-70.6600225491012, 45.46022288673396],
              [-70.30495378282376, 45.914794623389355],
              [-70.00014034695016, 46.69317088478567],
              [-69.23708614772835, 47.44777598732787],
              [-68.90478084987546, 47.184794623394396],
              [-68.23430497910454, 47.35462921812177],
              [-67.79035274928509, 47.066248887716995],
              [-67.79141211614706, 45.702585354182816],
              [-67.13734351262877, 45.137451890638886],
            ],
          ],
        },
      },
    ],
  };

  // Create a GeoJSON source with an empty lineString.
  let geojsonAnimation = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [],
        },
      },
    ],
  };

  const speedFactor = 10; // number of frames per longitude degree
  let animation; // to store and cancel the animation
  let startTime = 0;
  let progress = 0; // progress = timestamp - startTime
  let resetTime = false; // indicator of whether time reset is needed for the animation
  const pauseButton = document.getElementById("pause");

  let counter = 0;

  map.on("load", () => {
    map.addSource("line", {
      type: "geojson",
      data: geojsonAnimation,
    });

    // add the line which will be modified in the animation
    map.addLayer({
      id: "line-animation",
      type: "line",
      source: "line",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#ed6498",
        "line-width": 5,
        "line-opacity": 0.8,
      },
    });

    startTime = performance.now();

    animateLine();

    // click the button to pause or play
    pauseButton.addEventListener("click", () => {
      pauseButton.classList.toggle("pause");
      if (pauseButton.classList.contains("pause")) {
        cancelAnimationFrame(animation);
      } else {
        resetTime = true;
        animateLine();
      }
    });

    // reset startTime and progress once the tab loses or gains focus
    // requestAnimationFrame also pauses on hidden tabs by default
    document.addEventListener("visibilitychange", () => {
      resetTime = true;
    });

    // animated in a circle as a sine wave along the map.
    function animateLine(timestamp) {
      if (resetTime) {
        // resume previous progress
        startTime = performance.now() - progress;
        resetTime = false;
      } else {
        progress = timestamp - startTime;
      }

      const animatedAllPoints =
        counter === geojsonData.features[0].geometry.coordinates[0].length - 1;

      // erase geojson
      if (animatedAllPoints) {
        startTime = timestamp;
        geojsonAnimation.features[0].geometry.coordinates = [];
        counter = 0;
      } else {
        // get x and from geojsonData with number counter
        const [x, y] = geojsonData.features[0].geometry.coordinates[0][counter];
        // increment counter
        counter = counter + 1;
        // append new coordinates to the lineString
        geojsonAnimation.features[0].geometry.coordinates.push([x, y]);

        // then update the map
        map.getSource("line").setData(geojsonAnimation);
      }
      // Request the next frame of the animation.
      animation = requestAnimationFrame(animateLine);
    }
  });
});
</script>

<style scoped>
button {
  position: absolute;
  top: 0;
  margin: 20px;
}

#pause::after {
  content: "Pause";
}

#pause.pause::after {
  content: "Play";
}

.map-wrap {
  position: relative;
  width: 100%;
  height: calc(
    100vh - 77px
  ); /* calculate height of the screen minus the heading */
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div>
    <div class="map" ref="mapContainer"></div>
    <button id="pause"></button>
  </div>
</template>
