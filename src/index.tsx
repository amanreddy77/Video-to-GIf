import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Basic Reset */
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  /* Body and HTML */
  html, body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background-color: #f5f5f5; /* Light background for contrast */
    color: #333; /* Default text color */
    line-height: 1.6; /* Improved readability */
  }

  h1 {
    text-align: center;
    margin: 20px 0; /* Spacing for headings */
    font-size: 2.5rem; /* Responsive heading size */
    color: #222; /* Slightly darker color for headings */
  }

  a {
    color: #007bff; /* Link color */
    text-decoration: none; /* No underline */
    transition: color 0.3s ease; /* Smooth transition for hover */
    
    &:hover {
      color: #0056b3; /* Darker color on hover */
      text-decoration: underline; /* Underline on hover for visibility */
    }
  }

  /* Button Styles */
  button {
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease; /* Smooth background transition */
    
    &:hover {
      background-color: #e0e0e0; /* Light grey background on hover */
    }
  }

  /* Scrollbar Styles (for Webkit browsers) */
  ::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888; 
    border-radius: 10px; 
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555; 
  }

  /* Focus Styles */
  *:focus {
    outline: 2px solid #ff5722; /* Visible outline for focused elements */
    outline-offset: 2px; /* Space between the element and the outline */
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
