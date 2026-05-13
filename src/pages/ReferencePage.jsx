import { useContext, useEffect } from "react";
import PageContainer from "../components/ui/PageContainer.jsx";
import Hero from "../components/ui/Hero.jsx";
import Heading3 from "../components/ui/Heading3.jsx";
import styled from "styled-components";
import List from "../components/ui/List.jsx";
import ListItem from "../components/ui/ListItem.jsx";
import StyledLink from "../components/ui/StyledLink.jsx";
import {ResourcesContext} from "../contexts/ResourcesContext.jsx";

const StyledPage = styled(PageContainer)``;

const Card = styled.section`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.2rem 1.4rem;
  margin-bottom: 1.2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
`;

const SectionTitle = styled(Heading3)`
  margin-top: 0;
`;

const Paragraph = styled.p`
  color: #333;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;

const DocRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  margin-bottom: 1.2rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const DocCard = styled(Card)`
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
`;

const PdfFrame = styled.iframe`
  width: 100%;
  height: 480px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 0.6rem;
`;

const OpenInNewTab = styled.a`
  color: #591506;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function ReferencePage() {
  const resources = useContext(ResourcesContext);

  useEffect(() => {
    document.title = "References | Katy Resource Hub";
  }, []);

  // TODO: also dedupe by domain maybe?
  const resourceSourceLinks = [];
  resources.forEach(resource => {
    if (resource.sources) {
      resource.sources.forEach(source => {
        if (!resourceSourceLinks.includes(source)) {
          resourceSourceLinks.push(source);
        }
      });
    }
  });

  const unsplashCredits = [
    {
      id: 1,
      photographer: "Daniel",
      photographerUrl:
        "https://unsplash.com/@unsplashbydan?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
      photoUrl:
        "https://unsplash.com/photos/a-house-with-a-brick-chimney-8_XCuah3WXY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    },
    {
      id: 2,
      photographer: "Levi Meir Clancy",
      photographerUrl:
        "https://unsplash.com/@levimeirclancy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
      photoUrl:
        "https://unsplash.com/photos/brown-and-white-concrete-building-TFOidE2z6gw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    },
    {
      id: 3,
      photographer: "Erika Giraud",
      photographerUrl:
        "https://unsplash.com/@erikasayssmile?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
      photoUrl:
        "https://unsplash.com/photos/children-lifting-hands-4EFeD-VTgu4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    },
    {
      id: 4,
      photographer: "Jaime Lopes",
      photographerUrl:
        "https://unsplash.com/@jaimelopes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
      photoUrl:
        "https://unsplash.com/photos/people-raising-hands-with-bokeh-lights-0RDBOAdnbWM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    },
    {
      id: 5,
      photographer: "Joel Muniz",
      photographerUrl:
        "https://unsplash.com/@jmuniz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
      photoUrl:
        "https://unsplash.com/photos/man-in-black-t-shirt-holding-coca-cola-bottle-3k3l2brxmwQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    },
    {
      id: 6,
      photographer: "shraga kopstein",
      photographerUrl:
        "https://unsplash.com/@sfkopstein?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
      photoUrl:
        "https://unsplash.com/photos/a-construction-worker-working-on-a-building-under-construction-qNChJd-MhRs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    },
    {
      id: 7,
      photographer: "Juliane Liebermann",
      photographerUrl:
        "https://unsplash.com/@jule_42?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
      photoUrl:
        "https://unsplash.com/photos/man-carrying-to-girls-on-field-of-red-petaled-flower-O-RKu3Aqnsw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    },
    {
      id: 8,
      photographer: "In the Now Mag",
      photographerUrl:
        "https://unsplash.com/@inthenowmag?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
      photoUrl:
        "https://unsplash.com/photos/yellow-and-brown-concrete-house-XhVqa8AhXH0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    },
    {
      id: 9,
      photographer: "Eduardo Alexandre",
      photographerUrl:
        "https://unsplash.com/@eddalexandre?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
      photoUrl:
        "https://unsplash.com/photos/white-and-blue-office-rolling-chairs-r7V-18Zr_OY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    },
  ];

  return (
    <>
      <Hero title="Reference Page" image="/hero-references.jpg" />
      <StyledPage>
        <DocRow>
        <DocCard>
          <SectionTitle>Work Log</SectionTitle>
          <PdfFrame
            src="/plan-of-work-log.pdf"
            title="TSA Work Log PDF"
          />
          <OpenInNewTab
            href="/plan-of-work-log.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in new tab →
          </OpenInNewTab>
        </DocCard>
        <DocCard>
          <SectionTitle>Copyright Checklist</SectionTitle>
          <PdfFrame
            src="/student-copyright-checklist.pdf"
            title="Student Copyright Checklist PDF"
          />
          <OpenInNewTab
            href="/student-copyright-checklist.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in new tab →
          </OpenInNewTab>
        </DocCard>
      </DocRow>

      <Card>
        <SectionTitle>Code Stack</SectionTitle>
        <Paragraph>
          This site is built on the{" "}
          <StyledLink
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React.js
          </StyledLink>{" "}
          framework by Meta, bundled with{" "}
          <StyledLink
            href="https://vite.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite
          </StyledLink>
          . The entire theme was hand-built by us — no prebuilt themes or
          templates were used.
        </Paragraph>
        <Paragraph>
          The KRH logo and favicon were created by us. No external logos were
          used.
        </Paragraph>
      </Card>

      <Card>
        <SectionTitle>Additional Libraries Utilized</SectionTitle>
        <List>
          <ListItem>
            <StyledLink
              href="https://swiperjs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Swiper.js
            </StyledLink>{" "}
            — interactive carousel on the home page.
          </ListItem>
          <ListItem>
            <StyledLink
              href="https://styled-components.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Styled Components
            </StyledLink>{" "}
            — component-scoped CSS styling.
          </ListItem>
          <ListItem>
            <StyledLink
              href="https://react-router.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Router
            </StyledLink>{" "}
            — page routing.
          </ListItem>
          <ListItem>
            <StyledLink
              href="https://leafletjs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leaflet
            </StyledLink>{" "}
            — interactive resource map.
          </ListItem>
          <ListItem>
            <StyledLink
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenStreetMap
            </StyledLink>{" "}
            — map tile data, displayed via Leaflet attribution.
          </ListItem>
          <ListItem>
            <StyledLink
              href="https://www.fontshare.com/fonts/satoshi"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fontshare Satoshi
            </StyledLink>{" "}
            — primary website font.
          </ListItem>
          <ListItem>
            <StyledLink
              href="https://www.google.com/forms/about/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Forms
            </StyledLink>{" "}
            — embedded resource submission form.
          </ListItem>
          <ListItem>
            <StyledLink
              href="https://www.google.com/maps/about/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Maps
            </StyledLink>{" "}
            — embedded Katy location map and Directions links.
          </ListItem>
          <ListItem>
            <StyledLink
              href="https://geocoding.geo.census.gov/geocoder/"
              target="_blank"
              rel="noopener noreferrer"
            >
              U.S. Census Geocoder
            </StyledLink>{" "}
            — converting street addresses into map marker coordinates.
          </ListItem>
        </List>
      </Card>

      <Card>
        <SectionTitle>Research Links</SectionTitle>
        <Paragraph>
          Source pages used to verify directory information (organization
          contact info, hours, services).
        </Paragraph>
        <List>
          {resourceSourceLinks.map(source => (
            <ListItem key={source}>
              <StyledLink
                href={source}
                target="_blank"
                rel="noopener noreferrer"
              >
                {source}
              </StyledLink>
            </ListItem>
          ))}
        </List>
      </Card>

      <Card>
        <SectionTitle>Image Credits</SectionTitle>
        <Paragraph>
          All Unsplash photos used in compliance with the{" "}
          <StyledLink
            href="https://unsplash.com/license"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash License
          </StyledLink>
          .
        </Paragraph>
        <List>
          {unsplashCredits.map(credit => (
            <ListItem key={credit.id}>
              Photo by{" "}
              <StyledLink
                href={credit.photographerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {credit.photographer}
              </StyledLink>{" "}
              on{" "}
              <StyledLink
                href={credit.photoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash
              </StyledLink>
            </ListItem>
          ))}
        </List>
      </Card>
      </StyledPage>
    </>
  );
}
