import React from "react";
import styled from "styled-components";

const TemplateBlock = styled.div`
  width: 100vw;
  max-width: 390px;
  height: 100vh;
  max-height: 844px;
  position: relative;
  background-color: #fff;
  box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Template({ children }) {
  return <TemplateBlock>{children}</TemplateBlock>;
}

export default Template;
