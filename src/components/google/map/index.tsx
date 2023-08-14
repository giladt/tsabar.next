"use client";
import { useTheme } from "next-themes";
import { LoadScriptNext, GoogleMap, Circle } from "@react-google-maps/api";
import React from "react";
import MapThemes from "./MapTheme";
import { ImSpinner } from "react-icons/im";
import styles from "./google-map.module.scss";

type Coordinates = {
  lat: number;
  lng: number;
};
type MapProps = {
  coordinates: Coordinates;
  zoom: number;
};

const MapLoadError = ({ message }: { message: string }) => (
  <div className={styles.mapContainer}>
    <h3>Error loading map</h3>
    <p>{message}</p>
  </div>
);

const MapLoad = () => (
  <div className={styles.mapContainer}>
    <span>
      <ImSpinner className={styles.spinner} /> Loading Map...
    </span>
  </div>
);

type TGoogleMapsProps = {
  center: Coordinates;
  zoom: number;
  googleMapsApiKey: string | undefined;
};

export default function GoogleMaps({
  center,
  zoom,
  googleMapsApiKey,
}: TGoogleMapsProps): JSX.Element {
  if (typeof googleMapsApiKey === "undefined") {
    return <MapLoadError message="Invalid or missing API key." />;
  }

  return (
    <div className={styles.mapContainer}>
      <LoadScriptNext
        googleMapsApiKey={googleMapsApiKey}
        loadingElement={<MapLoad />}
      >
        <Map coordinates={center} zoom={zoom} />
      </LoadScriptNext>
    </div>
  );
}

const Map = ({ coordinates, zoom }: MapProps) => {
  const theme = useTheme();
  const mapOptions = {
    styles: MapThemes[theme.resolvedTheme as "dark" | "light"],
    center: coordinates,
    zoom,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    clickableIcons: false,
    backgroundColor: "transparent",
    gestureHandling: "auto",
    keyboardShortcuts: false,
  };

  return (
    <GoogleMap mapContainerClassName={styles.map} options={mapOptions}>
      {coordinates.lat !== 0 && coordinates.lng !== 0 && (
        <Circle
          center={coordinates}
          radius={350}
          options={{
            strokeColor: "#eb8a90",
            fillColor: "#eb8a90",
            fillOpacity: 0.35,
          }}
        />
      )}
    </GoogleMap>
  );
};
