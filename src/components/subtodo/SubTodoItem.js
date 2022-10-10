import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { MdDone, MdMoreHoriz } from "react-icons/md";
import SubMoreModal from "./SubMoreModal";
import { useTodoDispatch } from "./../TodoContext";

const SubTodoItemBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3% 0;

  &:last-child {
    padding: 3% 0 0;
  }
`;

const CheckCircle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  margin-right: 16px;
  border: 1.5px solid #534842;
  border-radius: 50%;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1.5px solid #eee9e5;
      color: #eee9e5;
    `}
`;

const TextForm = styled.form`
  flex: 1;
  display: flex;
`;

const Text = styled.input.attrs({
  type: "text",
})`
  flex: 1;
  font-size: 17px;
  color: #534842;
  ${(props) =>
    props.done &&
    css`
      color: #eee9e5;
      text-decoration: line-through;
    `}
`;

const EditBtn = styled.button.attrs({
  type: "submit",
})`
  width: max-content;
  font-size: 17px;
  font-weight: 600;
  color: #978174;
`;

const More = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #534842;

  ${(props) =>
    props.done &&
    css`
      color: #eee9e5;
    `}
`;

function SubTodoItem({ id, text, done }) {
  const dispatch = useTodoDispatch();

  function onCheck() {
    dispatch({ type: "SUB_CHECK", id, done: !done });
  }

  const [subMoreOpen, setSubMoreOpen] = useState(false);
  function subMoreToggleClick() {
    setSubMoreOpen(!subMoreOpen);
  }

  const [value, setValue] = useState(text);
  function onChange(e) {
    setValue(e.target.value);
  }
  const [read, setRead] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState(null);
  function onSubmit(e) {
    onUpdate(selectedTodo[0].id, value);
    setValue(value);
    e.preventDefault();
    setRead(!read);
  }
  function onUpdate(id, value) {
    dispatch({ type: "SUB_UPDATE", value, id });
  }

  const inputRef = useRef(null);

  return (
    <SubTodoItemBlock>
      <CheckCircle done={done} onClick={onCheck}>
        {done && <MdDone />}
      </CheckCircle>
      <TextForm onSubmit={onSubmit}>
        <Text
          value={value}
          onChange={onChange}
          done={done}
          readOnly={read}
          ref={inputRef}
        />
        {!read && <EditBtn>수정</EditBtn>}
        {!read && inputRef.current.focus()}
      </TextForm>
      {read && (
        <More done={done} onClick={subMoreToggleClick}>
          <MdMoreHoriz size="25px" />
          {subMoreOpen && (
            <SubMoreModal
              id={id}
              selectedTodo={selectedTodo}
              setSelectedTodo={setSelectedTodo}
              read={read}
              setRead={setRead}
            />
          )}
        </More>
      )}
    </SubTodoItemBlock>
  );
}

export default React.memo(SubTodoItem);
