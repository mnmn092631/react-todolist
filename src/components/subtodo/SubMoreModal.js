import React from "react";
import styled from "styled-components";
import { MdDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";
import { useTodoDispatch, useTodoState } from "./../TodoContext";

const ModalBlock = styled.div`
  position: absolute;
  top: 30px;
  right: -7px;
  width: 150px;
  background-color: #eee9e5;
  box-shadow: 1px 1px 2px #534842;
  border-radius: 5px;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    right: 10px;
    width: 0;
    height: 0;
    border-bottom: 10px solid #eee9e5;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }
`;

const ModalItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  color: #534842;
  padding: 2% 5%;
  font-weight: 600;

  &:first-child {
    border-radius: 5px 5px 0 0;
  }

  &:last-child {
    border-radius: 0 0 5px 5px;
  }

  svg {
    color: #534842;
  }

  &:hover {
    background-color: #534842;
    color: #fff;

    svg {
      color: #fff;
    }
  }
`;

function SubMoreModal({ id, selectedTodo, setSelectedTodo, read, setRead }) {
  const dispatch = useTodoDispatch();
  const { subtodos } = useTodoState();

  function Remove() {
    dispatch({ type: "SUB_REMOVE", id });
  }

  function onClick() {
    setRead(!read);
    setSelectedTodo(subtodos.filter((subtodo) => subtodo.id === id));
  }

  return (
    <ModalBlock>
      <ModalItem onClick={Remove}>
        <button type="button">
          <MdDeleteOutline size="25px" />
        </button>
        <span>삭제</span>
      </ModalItem>
      <ModalItem onClick={onClick}>
        <button type="button">
          <MdOutlineModeEditOutline size="25px" />
        </button>
        <span>수정</span>
      </ModalItem>
    </ModalBlock>
  );
}

export default SubMoreModal;
