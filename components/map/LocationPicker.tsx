import { useState, useCallback, useEffect } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 5.6037,
  lng: -0.187,
};

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = [
  "places",
];

interface LocationPickerProps {
  onLocationSelect: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
}

export default function LocationPicker({
  onLocationSelect,
}: LocationPickerProps) {
  const [marker, setMarker] = useState(defaultCenter);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: libraries,
  });

  const handleMapClick = useCallback(
    async (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;

      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarker({ lat, lng });

      try {
        const geocoder = new google.maps.Geocoder();
        const response = await geocoder.geocode({ location: { lat, lng } });

        if (response.results[0]) {
          onLocationSelect({
            lat,
            lng,
            address: response.results[0].formatted_address,
          });
        }
      } catch (error) {
        console.error("Error getting address:", error);
      }
    },
    [onLocationSelect]
  );

  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setMarker({ lat, lng });

          try {
            const geocoder = new google.maps.Geocoder();
            const response = await geocoder.geocode({ location: { lat, lng } });

            if (response.results[0]) {
              onLocationSelect({
                lat,
                lng,
                address: response.results[0].formatted_address,
              });
            }
          } catch (error) {
            console.error("Error getting address:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [onLocationSelect]);

  if (loadError) {
    return <div className="p-4 text-red-500">Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div className="p-4">Loading maps...</div>;
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={getCurrentLocation}
        className="mb-4 px-4 py-2 bg-black text-white rounded-md text-sm"
      >
        Use My Current Location
      </button>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={marker}
        zoom={15}
        onClick={handleMapClick}
      >
        <Marker position={marker} />
      </GoogleMap>
    </div>
  );
}
