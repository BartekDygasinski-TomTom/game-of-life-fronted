import { createRoot } from "react-dom/client";
import { Button, Heading, Text, TombacApp } from "tombac";
import React from "react";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <TombacApp
      defineCssVariables
      theme={{
        components: {
          button: {
            defaultProps: {
              hoverEffect: "color",
              size: "m",
              variant: "primary",
            },
          },
          ripple: {
            circleFill: "",
            fill: "",
          },
          toggleGroup: {
            current: undefined,
            defaultProps: undefined,
            defaultStyle: undefined,
            variant: undefined,
          },
        },
      }}
    >
      <MainPage />
    </TombacApp>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
