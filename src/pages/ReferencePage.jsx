import { useContext } from "react";
import PageContainer from "../components/ui/PageContainer.jsx";
import Heading1 from "../components/ui/Heading1.jsx";
import Heading3 from "../components/ui/Heading3.jsx";
import styled from "styled-components";
import List from "../components/ui/List.jsx";
import ListItem from "../components/ui/ListItem.jsx";
import StyledLink from "../components/ui/StyledLink.jsx";
import {ResourcesContext} from "../contexts/ResourcesContext.jsx";

const StyledPage = styled(PageContainer)`
  margin-top: 7.2rem;
`;

export default function ReferencePage() {
  const resources = useContext(ResourcesContext);
  const resourcesWithLinks = resources.filter(resource => resource.link);

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
    <StyledPage>
      <Heading1>Reference Page</Heading1>
      <List>
        <ListItem>
          This application is built on the{" "}
          <StyledLink
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React.js framework
          </StyledLink>{" "}
          by Meta. The theme for this website was built entirely by us; no
          prebuilt themes or templates were used.
        </ListItem>
        <ListItem>
          <StyledLink
            href="https://swiperjs.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Swiper.js
          </StyledLink>{" "}
          was used to implement interactive carousel functionality.
        </ListItem>
        <ListItem>
          <StyledLink
            href="https://styled-components.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Styled Components
          </StyledLink>{" "}
          was used to style the website.
        </ListItem>
        <ListItem>
          <StyledLink
            href="https://react-router.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Router
          </StyledLink>{" "}
          was used to implement routing.
        </ListItem>
        <ListItem>
          The KRH logo and favicon were created by us. No external logos were
          used.
        </ListItem>
      </List>

      <Heading3>
        For organization name and information listed in the resource directory:
      </Heading3>
      <List>
        {resourcesWithLinks.map(resource => (
          <ListItem key={resource.id}>
            <StyledLink
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {resource.name}
            </StyledLink>
          </ListItem>
        ))}
      </List>

      <Heading3>For photos used in the resource directory:</Heading3>
      <p>
        All Unsplash photos are used in compliance with the{" "}
        <a href="https://unsplash.com/license" target="_blank">
          Unsplash License
        </a>
        .
      </p>
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
    </StyledPage>
  );
}
