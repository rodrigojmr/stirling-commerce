import { createGlobalStyle } from '@emotion/styled';
import { up, down, between, only } from 'styled-breakpoints';

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;700&display=swap");

  *, *::after, *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  a{
    text-decoration:none;
    color:inherit;
    cursor:pointer;
  }
  button {
    background-color:transparent;
    color:inherit;
    border-width:0;
    padding:0;
    cursor:pointer;
    font-family: 'Bebas Neue';
  }
  ul, ol, dd, li{margin:0; padding:0; list-style:none;}
  h1, h2, h3, h4, h5, h6 {
  font-family: 'Bebas Neue';
   margin:0;
   font-size:inherit;
   font-weight:400;
  }
  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 400;
    font-family: inherit;
  }
  body {
   font-family: 'Source Sans Pro', sans-serif;
   font-size: 16px;
   font-weight: 400;
   color: #222;
  }

  html {
  box-sizing: border-box;
  font-size: 62.5%; /* 1rem = 10px; 10px/16px = 62.5% */
  }`;

export default GlobalStyle;
