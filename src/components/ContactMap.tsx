
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// IMPORTANT: You need a Mapbox access token for this component to work.
// 1. Go to https://www.mapbox.com/ and create an account.
// 2. Find your "Default public token" on your account page.
// 3. Replace 'YOUR_MAPBOX_ACCESS_TOKEN' below with your actual token.
// For production, it's recommended to store this in an environment variable.
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const ContactMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapboxgl.accessToken === 'YOUR_MAPBOX_ACCESS_TOKEN') {
      console.warn("Mapbox token is not set. The map will not be displayed.");
      return;
    }
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [38.7578, 8.9806], // Coordinates for Addis Ababa, Ethiopia
      zoom: 12
    });

    // Add a marker
    new mapboxgl.Marker()
      .setLngLat([38.7578, 8.9806])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setText('Zehulu.com Headquarters'))
      .addTo(map.current!);

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => map.current?.remove();
  }, []);

  if (mapboxgl.accessToken === 'YOUR_MAPBOX_ACCESS_TOKEN') {
    return (
      <div className="w-full h-full rounded-lg bg-muted flex items-center justify-center text-center p-4">
        <div>
          <h3 className="font-semibold text-foreground">Map Disabled</h3>
          <p className="text-muted-foreground text-sm">Please provide a Mapbox access token to display the map.</p>
        </div>
      </div>
    )
  }

  return <div ref={mapContainer} className="w-full h-full rounded-lg" />;
};

export default ContactMap;
