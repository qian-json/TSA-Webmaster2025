import {useContext, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import styled from "styled-components";
import {ResourcesContext} from "../contexts/ResourcesContext.jsx";
import ResourceMap from "../components/ResourceMap.jsx";
import PageContainer from "../components/ui/PageContainer.jsx";
import Hero from "../components/ui/Hero.jsx";

const StyledPage = styled(PageContainer)`
  max-width: 1200px;
`;

export default function MapPage() {
  const resources = useContext(ResourcesContext);
  const [searchParams] = useSearchParams();
  const selectedResourceId = searchParams.get("resource");

  useEffect(() => {
    document.title = "Map | Katy Resource Hub";
    if (window.location.hash === "#map") {
      const el = document.getElementById("map");
      if (el) el.scrollIntoView({behavior: "smooth"});
    }
  }, []);

  return (
    <>
      <Hero
        title="Map"
        text="Locate resources on our map."
        image="/hero-map.jpg"
      />
      <StyledPage id="map">
        <ResourceMap
          resources={resources}
          selectedResourceId={selectedResourceId}
        />
      </StyledPage>
    </>
  );
}
