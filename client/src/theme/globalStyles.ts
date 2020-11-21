import { createGlobalStyle } from 'styled-components';
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
  }
  ul, ol, dd, li{margin:0; padding:0; list-style:none;}
  h1, h2, h3, h4, h5, h6 {
  font-family: 'Bebas Neue';
   margin:0;
   font-size:inherit;
   font-weight:inherit;
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
  font-size: 62.5%; /* 1rem = 10px; 10px/16px = 62.5%*/
  /* $(down ('phone'))

  @include respond(big-desktop) { // width < 1800?
    font-size: 75%; 1rem = 12, 12/16 = 75%
  }

  @include respond(tab-land) {  // width < 900?
    font-size: 56.25%; 1rem = 9px; 9px/16px = 56.25%
  }
  
  @include respond(tab-port) {  // width < 600?
    font-size: 50%; 1rem = 8px; 8px/16px = 50%
  }
} */

  `;

export default GlobalStyle;
