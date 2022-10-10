import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useTodoState } from "../TodoContext";
import SubTodoItem from "./SubTodoItem";
import { useTodoDispatch } from "./../TodoContext";

const SubTodoListBlock = styled.div`
  flex: 1;
  padding: 2% 10%;

  ${(props) =>
    props.open
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}
`;

function SubTodoList({ surtodoId, open }) {
  const { subtodos } = useTodoState();
  const dispatch = useTodoDispatch();

  useEffect(() => {
    const subtodo = subtodos.filter((subtodo) => subtodo.surtodo === surtodoId);
    const subtodoDone = subtodo.filter((subtodo) => subtodo.done === true);

    subtodo.length > 0 &&
      (subtodo.length === subtodoDone.length
        ? dispatch({ type: "SUR_CHECK", id: surtodoId, done: true })
        : dispatch({ type: "SUR_CHECK", id: surtodoId, done: false }));
  }, [dispatch, surtodoId, subtodos]);

  return (
    <SubTodoListBlock open={open}>
      {subtodos
        .filter((subtodo) => subtodo.surtodo === surtodoId)
        .map((subtodo) => (
          <SubTodoItem
            key={subtodo.id}
            id={subtodo.id}
            surtodo={subtodo.surtodo}
            text={subtodo.text}
            done={subtodo.done}
          />
        ))}
    </SubTodoListBlock>
  );
}

export default SubTodoList;
