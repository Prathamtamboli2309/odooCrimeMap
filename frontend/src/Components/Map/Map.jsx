import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.heat";

const HeatMap = ({ crimeReports }) => {
  useEffect(() => {
    if (!crimeReports || crimeReports.length === 0) return;

    // Initialize Leaflet map
    const map = L.map("map").setView([20.5937, 78.9629], 7);

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Marker clustering
    const markers = L.markerClusterGroup();
    console.log(crimeReports);
    crimeReports.forEach((report) => {
      const marker = L.marker([
        report.location.latitude,
        report.location.longitude,
      ]).bindPopup(`<b>${report.title}</b><br>${report.description}`);
      markers.addLayer(marker);
    });
    map.addLayer(markers);

    // Heatmap layer
    const heatPoints = crimeReports.map((report) => [
      report.location.latitude,
      report.location.longitude,
    ]);
    L.heatLayer(heatPoints, { radius: 52 }).addTo(map);

    // Cleanup function (optional)
    return () => {
      map.remove(); // Remove the map instance when component unmounts
    };
  }, [crimeReports]); // Depend on crimeReports to update when data changes

  return <div id="map" style={{ height: "100vh", width: "100%" }}></div>;
};

export default HeatMap;
