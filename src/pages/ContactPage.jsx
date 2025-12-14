import styled from "styled-components";
import PageContainer from "../components/ui/PageContainer.jsx";

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

export default function ContactPage() {
  return (
    <PageContainer>
      {/* <Card> */}
      {/* <h2>Contact Us</h2> */}
      <Iframe
        title="Google Form"
        src="https://docs.google.com/forms/d/e/1FAIpQLScSxptr0hL38kTPzhhXoENyC1QgDZpQwk7yKfWKdgL5h8LWqQ/viewform?embedded=true"
      >
        Loading…
      </Iframe>
      {/* </Card> */}
    </PageContainer>
  );
}
