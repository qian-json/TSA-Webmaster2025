import styled from "styled-components";

const StyledLink = styled.a`
  color: #0066cc;
  text-decoration: underline;
  transition: color 0.2s;

  &:hover {
    color: #004499;
  }

  &:visited {
    color: #551a8b;
  }
`;

export default StyledLink;

