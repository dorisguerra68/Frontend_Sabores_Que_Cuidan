import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import './styles/Index-Global.css';
import './styles/Components.css';
import './styles/Responsive-ordenador.css';
import './styles/Responsive-movil.css';
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
