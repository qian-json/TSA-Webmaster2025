import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {useContext} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {ResourcesContext} from "../contexts/ResourcesContext.jsx";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import PageContainer from "../components/ui/PageContainer.jsx";

const HomeHeroCarousel = styled.div`
  position: relative;
  width: 100vw;
`;

const Card = styled.section`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 16px;
  }
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 600px;
  border: none;
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
`;

const SlideOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  gap: 1rem;
`;

const Spotlighted = styled.p`
  color: #d3d3d3;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
  text-decoration: underline;
`;
const ResourceName = styled.h2`
  color: #ffffff;
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 0 2rem;
`;

const ResourceDescription = styled.p`
  color: #f1f1f1;
  font-size: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 0 2rem;
  max-width: 51.2rem;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: #333;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  transition: background-color 0.2s, transform 0.2s;
  margin: 2rem auto;
  max-width: fit-content;

  &:hover {
    background-color: #000;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CTAContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 2rem 0;
`;

export default function HomePage() {
  const resources = useContext(ResourcesContext);
  const spotlightedResources = resources.filter(
    resource => resource.spotlighted
  );

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{clickable: true}}
        slidesPerView={1}
        style={{width: "100vw", height: "67vh"}}
      >
        {spotlightedResources.map(resource => (
          <SwiperSlide key={resource.id}>
            <SlideContainer>
              <CarouselImage src={resource.imageUrl} alt={resource.name} />
              <SlideOverlay>
                <Spotlighted>Spotlighted</Spotlighted>
                <ResourceName>{resource.name}</ResourceName>
                <ResourceDescription>
                  {resource.description}
                </ResourceDescription>
              </SlideOverlay>
            </SlideContainer>
          </SwiperSlide>
        ))}
      </Swiper>

      <CTAContainer>
        <CTAButton to="/resources">View All Resources</CTAButton>
      </CTAContainer>

      <PageContainer>
        <Card>
          <h2>Our Location</h2>
          <Iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55400.42401818665!2d-95.8984600616569!3d29.79133016309543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640dff9ae358adf%3A0x17966e0d7c2b1125!2sKaty%2C%20TX!5e0!3m2!1sen!2sus!4v1765663225217!5m2!1sen!2sus"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></Iframe>
        </Card>
      </PageContainer>
    </>
  );
}