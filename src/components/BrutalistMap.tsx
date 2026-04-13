"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// Fix for default leaflet icons in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function BrutalistMap() {
  const [isMounted, setIsMounted] = useState(false);
  const position: [number, number] = [43.834070, 11.201770];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-[500px] bg-foreground/5 animate-pulse border-4 border-foreground" />;

  return (
    <div className="relative h-[600px] w-full border-4 border-foreground brutalist-shadow grayscale invert brightness-100 contrast-125">
      <MapContainer 
        center={position} 
        zoom={16} 
        scrollWheelZoom={false} 
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>
            <span className="font-black uppercase tracking-tight">Artecno Studio Tecnico Associato</span>
          </Popup>
        </Marker>
      </MapContainer>
      
      {/* Brutalist Overlays */}
      <div className="absolute top-8 left-8 z-[1000] bg-background border-4 border-foreground p-6 shadow-[8px_8px_0_0_#000] max-w-xs">
        <h4 className="text-3xl font-black uppercase tracking-tighter mb-2 italic">Headquarters</h4>
        <p className="text-sm font-bold uppercase leading-none opacity-80">
          Via Matteotti, 88<br />
          50019 Sesto Fiorentino (FI)
        </p>
      </div>

      <div className="absolute bottom-8 right-8 z-[1000] bg-accent border-4 border-foreground p-4 shadow-[8px_8px_0_0_#000]">
        <span className="text-xl font-black text-white uppercase tracking-widest">43.8340° N, 11.2017° E</span>
      </div>

      <div className="absolute inset-0 pointer-events-none border-[20px] border-foreground/5" />
    </div>
  );
}
