import {useEffect, useMemo, useRef, useState} from "react";
import L from "leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import {formatAddress} from "../data/resources.js";

const MapShell = styled.section`
  margin-top: 1.2rem;
`;

const MapLayout = styled.div`
  display: grid;
  gap: 1.4rem;
  grid-template-columns: minmax(0, 1fr) 280px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const MapFrame = styled.div`
  position: relative;
`;

const MapCanvas = styled.div`
  height: 560px;
  min-height: 560px;

  .leaflet-container {
    border: 1px solid #ddd;
    height: 100%;
    width: 100%;
  }

  .resource-map-marker {
    align-items: center;
    background: #591506;
    border: 2px solid #ffffff;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.28);
    color: #ffffff;
    display: flex;
    font-size: 0.9rem;
    font-weight: 700;
    height: 32px;
    justify-content: center;
    width: 32px;
  }

  .resource-popup {
    color: #333;
    font-family: Satoshi, sans-serif;
    line-height: 1.35;
  }

  .resource-popup strong {
    display: block;
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  .resource-popup a {
    color: #0066cc;
    display: inline-block;
    margin-top: 0.45rem;
  }
`;

const SelectedPanel = styled.aside`
  border-left: 1px solid #ddd;
  color: #333;
  padding-left: 1.2rem;

  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 0.55rem;
  }

  p {
    color: #666;
    font-size: 0.92rem;
    line-height: 1.35;
    margin-bottom: 0.7rem;
  }

  @media (max-width: 860px) {
    border-left: 0;
    padding-left: 0;
  }
`;

const DetailLabel = styled.span`
  color: #333;
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
  text-transform: uppercase;
`;

const DetailBlock = styled.div`
  font-size: 0.92rem;
  line-height: 1.35;
  margin-bottom: 0.75rem;
`;

const ServiceList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.85rem;
`;

const ServicePill = styled.li`
  background-color: #f2f2f2;
  border-radius: 999px;
  color: #333;
  font-size: 0.78rem;
  padding: 0.3rem 0.55rem;
`;

const PanelLink = styled.a`
  background-color: #333;
  border-radius: 8px;
  color: #ffffff;
  display: inline-block;
  font-size: 0.92rem;
  font-weight: 700;
  margin-right: 0.45rem;
  margin-top: 0.2rem;
  padding: 0.6rem 0.8rem;
  text-decoration: none;

  &:hover {
    background-color: #000;
  }
`;

const EmptyMapState = styled.div`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.86);
  border-radius: 8px;
  color: #666;
  display: flex;
  inset: 0;
  justify-content: center;
  line-height: 1.4;
  padding: 1.2rem;
  position: absolute;
  text-align: center;
  z-index: 500;
`;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getDirectionsUrl(resource) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    formatAddress(resource.address)
  )}`;
}

function getPopupHtml(resource) {
  const address = formatAddress(resource.address);
  const services = resource.services.slice(0, 3).join(", ");
  const approximateNote = resource.coordinates.approximate
    ? "<br><em>Marker location is approximate.</em>"
    : "";

  return `
    <div class="resource-popup">
      <strong>${escapeHtml(resource.name)}</strong>
      ${escapeHtml(services)}<br>
      ${escapeHtml(address)}<br>
      ${escapeHtml(resource.phone)}
      ${approximateNote}<br>
      <a href="${getDirectionsUrl(resource)}" target="_blank" rel="noreferrer">Directions</a>
    </div>
  `;
}

export default function ResourceMap({resources, selectedResourceId}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerLayerRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);

  const mappableResources = useMemo(
    () => resources.filter(resource => resource.coordinates),
    [resources]
  );

  const selectedResource =
    mappableResources.find(resource => resource.id === selectedId) ??
    mappableResources.find(resource => resource.id === selectedResourceId) ??
    mappableResources[0];

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current, {
      scrollWheelZoom: false,
    }).setView([29.78, -95.79], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapRef.current);

    markerLayerRef.current = L.layerGroup().addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markerLayerRef.current) return;

    markerLayerRef.current.clearLayers();

    const bounds = [];
    let selectedMarker = null;

    mappableResources.forEach((resource, index) => {
      const {lat, lng} = resource.coordinates;
      const marker = L.marker([lat, lng], {
        icon: L.divIcon({
          className: "resource-map-marker",
          html: String(index + 1),
          iconAnchor: [16, 16],
          iconSize: [32, 32],
        }),
      })
        .bindPopup(getPopupHtml(resource))
        .on("click", () => setSelectedId(resource.id));

      marker.addTo(markerLayerRef.current);
      bounds.push([lat, lng]);

      if (selectedResource && resource.id === selectedResource.id) {
        selectedMarker = marker;
      }
    });

    if ((selectedId || selectedResourceId) && selectedMarker && selectedResource) {
      mapRef.current.setView(
        [selectedResource.coordinates.lat, selectedResource.coordinates.lng],
        13
      );
      selectedMarker.openPopup();
      return;
    }

    if (bounds.length === 1) {
      mapRef.current.setView(bounds[0], 13);
    }

    if (bounds.length > 1) {
      mapRef.current.fitBounds(bounds, {
        maxZoom: 13,
        padding: [34, 34],
      });
    }
  }, [mappableResources, selectedId, selectedResource, selectedResourceId]);

  return (
    <MapShell aria-label="Resource map">
      <MapLayout>
        <MapFrame>
          <MapCanvas ref={containerRef} aria-label="Filtered resource map" />
          {mappableResources.length === 0 && (
            <EmptyMapState>
              No matching resources are available on the map.
            </EmptyMapState>
          )}
        </MapFrame>
        {selectedResource && (
          <SelectedPanel>
            <h3>{selectedResource.name}</h3>
            <p>{selectedResource.description}</p>
            <ServiceList>
              {selectedResource.services.map(service => (
                <ServicePill key={service}>{service}</ServicePill>
              ))}
            </ServiceList>
            <DetailBlock>
              <DetailLabel>Address</DetailLabel>
              {formatAddress(selectedResource.address)}
              {selectedResource.coordinates.approximate && " (approximate marker)"}
            </DetailBlock>
            <DetailBlock>
              <DetailLabel>Phone</DetailLabel>
              {selectedResource.phone}
            </DetailBlock>
            <DetailBlock>
              <DetailLabel>Hours</DetailLabel>
              {selectedResource.hours}
            </DetailBlock>
            <PanelLink
              href={selectedResource.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </PanelLink>
            <PanelLink
              href={getDirectionsUrl(selectedResource)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Directions
            </PanelLink>
          </SelectedPanel>
        )}
      </MapLayout>
    </MapShell>
  );
}
