import React from "react";
import styled from "styled-components";
import {
  MdPlaylistAdd,
  MdDeleteOutline,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import { useTodoState } from "../TodoContext";
import { useTodoDispatch } from "./../TodoContext";

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

function SurMoreModal({
  id,
  addOpen,
  setAddOpen,
  selectedTodo,
  setSelectedTodo,
  read,
  setRead,
  setSubTodoOpen,
}) {
  const dispatch = useTodoDispatch();
  const { surtodos } = useTodoState();

  function AddSubtodoToggle() {
    setAddOpen(!addOpen);
    setSubTodoOpen(true);
  }

  function Remove() {
    dispatch({ type: "SUR_REMOVE", id });
  }

  function onClick() {
    setRead(!read);
    setSelectedTodo(surtodos.filter((surtodo) => surtodo.id === id));
  }

  return (
    <ModalBlock>
      <ModalItem onClick={AddSubtodoToggle}>
        <button type="button">
          <MdPlaylistAdd size="25px" />
        </button>
        <span>하위 목록 추가</span>
      </ModalItem>
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

export default SurMoreModal;
