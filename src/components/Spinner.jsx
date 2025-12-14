import styled, {keyframes} from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const SpinnerCircle = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #ccc;
  border-top-color: #000;
  border-radius: 50%;
  animation: ${spin} 0.9s linear infinite;
`;

export default function Spinner() {
  return (
    <SpinnerOverlay>
      <SpinnerCircle />
    </SpinnerOverlay>
  );
}
