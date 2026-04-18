"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

const centres = [
  {
    name: "Earley",
    label: "Earley Centre",
    address: "459 Wokingham Road, Earley, Reading RG6 7HU",
    lat: 51.4468,
    lng: -0.9376,
    zoom: 15,
  },
  {
    name: "Caversham",
    label: "Caversham Centre",
    address: "12 Church Road, Caversham, Reading RG4 7AD",
    lat: 51.4677,
    lng: -0.9768,
    zoom: 15,
  },
  {
    name: "Reading",
    label: "Reading Centre",
    address: "35 Queens Road, Reading RG1 4AR",
    lat: 51.4543,
    lng: -0.9788,
    zoom: 15,
  },
  {
    name: "Slough",
    label: "Slough Centre",
    address: "78 High Street, Slough SL1 1EL",
    lat: 51.5105,
    lng: -0.5950,
    zoom: 15,
  },
];

function osmEmbedUrl(lat: number, lng: number, zoom: number) {
  const delta = 0.008 / (zoom / 15);
  const bbox = `${lng - delta},${lat - delta * 0.6},${lng + delta},${lat + delta * 0.6}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
}

export function CentreMap() {
  const [active, setActive] = useState(0);
  const centre = centres[active];

  return (
    <section className="py-16 bg-white" aria-labelledby="map-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-3">Find us</p>
          <h2 id="map-heading" className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
            Our locations
          </h2>
        </div>

        {/* Tab strip */}
        <div className="flex flex-wrap gap-2 justify-center mb-6" role="tablist" aria-label="Select centre">
          {centres.map((c, i) => (
            <button
              key={c.name}
              role="tab"
              aria-selected={i === active}
              aria-controls={`map-panel-${i}`}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${
                i === active
                  ? "bg-primary text-white border-primary shadow-md"
                  : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              {c.name}
            </button>
          ))}
        </div>

        {/* Map + address panel */}
        <div className="rounded-2xl overflow-hidden border border-border shadow-md">
          {/* Address bar */}
          <div className="bg-muted px-5 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 border-b border-border">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <p className="font-semibold text-primary text-sm">{centre.label}</p>
            </div>
            <p className="text-sm text-muted-foreground sm:border-l sm:border-border sm:pl-4">{centre.address}</p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(centre.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:ml-auto text-xs font-semibold text-primary hover:text-accent transition-colors underline underline-offset-4 shrink-0"
            >
              Open in Google Maps ↗
            </a>
          </div>

          {/* Map iframe */}
          <div
            id={`map-panel-${active}`}
            role="tabpanel"
            className="w-full h-72 sm:h-96"
          >
            <iframe
              key={active}
              src={osmEmbedUrl(centre.lat, centre.lng, centre.zoom)}
              title={`Map showing ${centre.label}`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-3">
          Map data © <a href="https://www.openstreetmap.org/copyright" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors
        </p>
      </div>
    </section>
  );
}
