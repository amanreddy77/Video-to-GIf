import styled from "styled-components";
import React from "react";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensures it's above all other elements */
`;

const BlurredBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px); /* Blurs the background */
  z-index: -1; /* Send it behind the status message */
`;

const StatusMessage = styled.div`
  font-size: 24px;
  color: coral;
  background: white;
  padding: 20px 40px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  position: relative; /* Ensure it is on top of the blurred background */
  z-index: 1; /* Ensure it is on top of the blurred background */
`;

interface Props {
  children: string | null;
}

export const Status: React.FC<Props> = (props) => {
  const { children } = props;

  if (children == null) {
    return null;
  }

  return (
    <Overlay>
      <BlurredBackground />
      <StatusMessage>Status: {children}</StatusMessage>
    </Overlay>
  );
};
