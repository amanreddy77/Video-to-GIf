import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: #333;
  bottom: 0;
  color: #fff;
  font-size: 16px; 
  height: 50px; 
  left: 0;
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  padding: 0 16px;
  position: fixed;
  right: 0;
  text-align: right;

  @media (max-width: 600px) {
    font-size: 12px; 
    height: 40px; 
  }
`;

const Copyright = styled.a`
  color: inherit;
  text-decoration: none; 
  transition: color 0.3s; 

  &:hover {
    color: #ff5722; 
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 10px; 
`;

const Icon = styled.a`
  color: inherit;
  text-decoration: none; 
  font-size: 16px; 

  &:hover {
    color: #ff5722; 
  }
`;

export const Footer = () => (
  <StyledFooter>
    <Copyright href="https://portfolio-aman-gamma.vercel.app/" target="_blank" rel="noreferrer noopener">
      &copy; 2024 Aman Reddy Pundru
    </Copyright>
    <SocialLinks>
      <Icon href="https://x.com/AmanReddyP2" target="_blank" rel="noreferrer noopener">𝕏</Icon>
      <Icon href="https://github.com/amanreddy77" target="_blank" rel="noreferrer noopener">github</Icon>
      <Icon href="https://www.linkedin.com/in/aman-reddy-pundru-272b53221/" target="_blank" rel="noreferrer noopener">Linkedin</Icon>
    </SocialLinks>
  </StyledFooter>
);
