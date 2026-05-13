import styled from "styled-components";

const HeroSection = styled.section`
  width: 100vw;
  height: 67vh;
  background-color: #591506;
  background-image: linear-gradient(
      rgba(89, 21, 6, 0.7),
      rgba(45, 10, 3, 0.85)
    ),
    url(${props => props.$image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 2rem;
  box-sizing: border-box;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
`;

const HeroText = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  max-width: 720px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
`;

export default function Hero({title, text, image}) {
  return (
    <HeroSection $image={image}>
      <HeroTitle>{title}</HeroTitle>
      {text && <HeroText>{text}</HeroText>}
    </HeroSection>
  );
}
