import React from "react";
import styled from "styled-components";
import { useTodoState } from "../TodoContext";
import SurTodoItem from "./SurTodoItem";

const SurTodoListBlock = styled.div`
  width: 85%;
  flex: 1;
`;

function SurTodoList() {
  const { surtodos } = useTodoState();

  return (
    <SurTodoListBlock>
      {surtodos.map((surtodo) => (
        <SurTodoItem
          key={surtodo.id}
          id={surtodo.id}
          text={surtodo.text}
          done={surtodo.done}
        />
      ))}
    </SurTodoListBlock>
  );
}

export default SurTodoList;
