"use client";
import { useTheme } from "next-themes";
import { LoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import React, { useState } from "react";
import MapThemes from "./MapTheme";
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
  <>
    <h3>Error loading map</h3>
    <p>{message}</p>
  </>
);

export const GoogleMaps = ({
  center,
  zoom,
}: {
  center: Coordinates;
  zoom: number;
}): JSX.Element => {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (googleMapsApiKey === undefined) {
    return <MapLoadError message="Invalid or missing API key." />;
  }
  return (
    <div className={styles.map}>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        mapIds={["e1acf1f72565fcfc", "21b6c08e77b1f04a"]}
      >
        <Map coordinates={center} zoom={zoom} />
      </LoadScript>
    </div>
  );
};

const Map = ({ coordinates, zoom }: MapProps) => {
  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const theme = useTheme();

  const onLoad = React.useCallback(
    (map: google.maps.Map) => {
      map.setOptions({
        disableDefaultUI: true,
        keyboardShortcuts: false,
        styles: MapThemes[theme?.theme as "dark" | "light"],
        zoom,
      });
      setMap(map);
    },
    [theme.theme, zoom]
  );

  const onUnMount = React.useCallback(() => {
    setMap(null);
  }, []);

  React.useEffect(() => {
    if (map) {
      map.setOptions({
        styles: MapThemes[theme?.theme as "dark" | "light"],
        zoom,
      });
    }
  }, [theme.theme, map, zoom]);

  return (
    <GoogleMap
      mapContainerClassName={styles.map}
      zoom={zoom}
      center={coordinates}
      onLoad={onLoad}
      onUnmount={onUnMount}
    >
      {coordinates.lat !== 0 && coordinates.lng !== 0 && (
        <MarkerF position={coordinates} />
      )}
    </GoogleMap>
  );
};
