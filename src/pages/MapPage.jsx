import {useContext} from "react";
import {useSearchParams} from "react-router-dom";
import styled from "styled-components";
import {ResourcesContext} from "../contexts/ResourcesContextObject.jsx";
import ResourceMap from "../components/ResourceMap.jsx";
import Heading1 from "../components/ui/Heading1.jsx";
import PageContainer from "../components/ui/PageContainer.jsx";

const StyledPage = styled(PageContainer)`
  margin-top: 7.2rem;
  max-width: 1200px;
`;

const Intro = styled.p`
  color: #555;
  line-height: 1.45;
  margin-bottom: 1rem;
`;

export default function MapPage() {
  const resources = useContext(ResourcesContext);
  const [searchParams] = useSearchParams();
  const selectedResourceId = searchParams.get("resource");

  return (
    <StyledPage>
      <Heading1>Map</Heading1>
      <Intro>Locations and contact details for Katy-area resources.</Intro>
      <ResourceMap
        resources={resources}
        selectedResourceId={selectedResourceId}
      />
    </StyledPage>
  );
}
