import { createRoot } from "react-dom/client";
import { Button, Heading, Text, TombacApp } from "tombac";
import React from "react";

const App = () => {
  return (
    <TombacApp>
      <Heading level={1}>Hello world!</Heading>
      <Text>Lorem ipsum dolor sit amet.</Text>
      <Button onClick={() => alert("Thank you!")} variant="primary">
        Click me
      </Button>
    </TombacApp>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
