import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import './styles/index-global.css';
import './styles/Components.css';
import './styles/responsive-ordenador.css';
import './styles/responsive-movil.css';
import './styles/Variables.css';
import './styles/RegistrarComida.css';


import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
