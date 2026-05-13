import {useEffect, useRef, useState} from "react";
import L from "leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";

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
    background: #1e3a8a;
    border: 2px solid #ffffff;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.28);
    height: 24px;
    width: 24px;
  }

  .resource-map-marker.marker-recreation {
    background: #2d6b3a;
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
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  color: #333;
  padding: 1.2rem;

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
  background-color: #591506;
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
    background-color: #3f0e04;
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

function getDirectionsUrl(resource) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    resource.address
  )}`;
}

function getPopupHtml(resource) {
  const tags = resource.tags ? resource.tags.slice(0, 3).join(", ") : "";
  const phoneLine = resource.phone ? `${resource.phone}<br>` : "";
  let approximateNote = "";
  if (resource.coordinates.approximate) {
    approximateNote = "<em>Marker location is approximate.</em><br>";
  }

  return `
    <div class="resource-popup">
      <strong>${resource.name}</strong>
      ${tags}<br>
      ${resource.address}<br>
      ${phoneLine}
      ${approximateNote}
      <a href="${getDirectionsUrl(resource)}" target="_blank">Directions</a>
    </div>
  `;
}

export default function ResourceMap({resources, selectedResourceId}) {
  const containerRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);

  const mappableResources = resources.filter(resource => resource.coordinates);

  const selectedResource =
    mappableResources.find(resource => resource.id === selectedId) ||
    mappableResources.find(resource => resource.id === selectedResourceId) ||
    mappableResources[0];

  useEffect(() => {
    if (!containerRef.current) return;
    // console.log("rebuilding map");

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
    }).setView([29.78, -95.79], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const mappable = resources.filter(r => r.coordinates);
    const bounds = [];
    let selectedMarker = null;
    const currentSelected =
      mappable.find(r => r.id === selectedId) ||
      mappable.find(r => r.id === selectedResourceId) ||
      mappable[0];

    mappable.forEach(resource => {
      const {lat, lng} = resource.coordinates;
      const isRec = resource.tags && resource.tags[0] === "recreation";
      const className = isRec
        ? "resource-map-marker marker-recreation"
        : "resource-map-marker";
      const marker = L.marker([lat, lng], {
        icon: L.divIcon({
          className,
          html: "",
          iconAnchor: [12, 12],
          iconSize: [24, 24],
        }),
      })
        .bindPopup(getPopupHtml(resource))
        .on("click", () => setSelectedId(resource.id));

      marker.addTo(map);
      bounds.push([lat, lng]);

      if (currentSelected && resource.id === currentSelected.id) {
        selectedMarker = marker;
      }
    });

    if ((selectedId || selectedResourceId) && selectedMarker && currentSelected) {
      map.setView(
        [currentSelected.coordinates.lat, currentSelected.coordinates.lng],
        13
      );
      selectedMarker.openPopup();
    } else if (bounds.length === 1) {
      map.setView(bounds[0], 13);
    } else if (bounds.length > 1) {
      map.fitBounds(bounds, {
        maxZoom: 13,
        padding: [34, 34],
      });
    }

    return () => {
      map.remove();
    };
  }, [resources, selectedId, selectedResourceId]);

  let hoursText = "";
  if (selectedResource) {
    hoursText = selectedResource.hours;
    if (hoursText === "//event-dependent:contact") {
      hoursText = "Contact organization for event schedules";
    }
  }

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
              {selectedResource.tags && selectedResource.tags.map(tag => (
                <ServicePill key={tag}>{tag}</ServicePill>
              ))}
            </ServiceList>
            <DetailBlock>
              <DetailLabel>Address</DetailLabel>
              {selectedResource.address}
              {selectedResource.coordinates.approximate && " (approximate marker)"}
            </DetailBlock>
            {selectedResource.phone && (
              <DetailBlock>
                <DetailLabel>Phone</DetailLabel>
                {selectedResource.phone}
              </DetailBlock>
            )}
            {selectedResource.hours && (
              <DetailBlock>
                <DetailLabel>Hours</DetailLabel>
                {hoursText}
              </DetailBlock>
            )}
            {selectedResource.link && selectedResource.link !== "#" && (
              <PanelLink
                href={selectedResource.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </PanelLink>
            )}
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
