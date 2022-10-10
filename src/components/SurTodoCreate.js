import React, { useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useTodoDispatch } from "./TodoContext";

const CreateForm = styled.form`
  position: relative;
  top: -27px;
  display: flex;
  width: 85%;
  padding: 2%;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 1px 1px 3px #eee9e5;
`;

const AddBtn = styled.button.attrs({
  type: "button",
})`
  position: absolute;
  top: 50%;
  left: 2%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0);
`;

const line1Animation = keyframes`
  0%{
    transform: rotate(0);
  }
  90%{
    transform: rotate(90deg);
  }
  100%{
  transform: rotate(90deg);
  opacity: 0;}
`;

const line1AnimationReverse = keyframes`
  0%{
    transform: rotate(90deg);
    opacity: 0;
  }
  10%{
    transform: rotate(90deg);
    opacity: 1;
  }
  100%{
    transform: rotate(0);
    opacity: 1;
  }
`;

const Line1 = styled.div`
  position: absolute;
  top: 8px;
  left: 0;
  width: 20px;
  height: 4px;
  background-color: #978174;

  ${(props) =>
    props.focus
      ? css`
          animation: ${line1Animation} 300ms ease-in-out both;
        `
      : css`
          animation: ${line1AnimationReverse} 300ms ease-in-out both;
        `};
`;

const Line2 = styled.div`
  position: absolute;
  top: 0;
  left: 8px;
  width: max-content;
  max-width: 269px;
  min-width: 4px;
  height: 20px;
  border-right: 4px solid #978174;
  font-size: 20px;
  line-height: 20px;
  pointer-events: none;
`;

const Input = styled.input.attrs({
  type: "text",
  placeholder: "할 일을 입력해주세요",
})`
  flex: 1;
  padding: 2% 2% 2% 7%;
  font-size: 20px;
  color: transparent;
  text-shadow: 0 0 0 #fff;
  &::placeholder {
    color: #eee9e5;
  }

  &:focus::placeholder {
    opacity: 0;
  }

  &:focus {
    padding: 2%;
  }
`;

const SubmitBtn = styled.button.attrs({
  type: "submit",
})`
  opacity: 0;
  padding: 2%;
  font-size: 17px;
  font-weight: 600;
  color: ${(props) =>
    props.text.length > 0 ? "#978174" : props.active ? "#978174" : "#EEE9E5"};
  transition: opacity 250ms ease-in;
  pointer-events: ${(props) => props.text.length === 0 && "none"};

  ${Input}:focus + & {
    opacity: 1;
  }
`;

function SurTodoCreate() {
  const dispatch = useTodoDispatch();

  const [focus, setFocus] = useState(false);
  const [text, setText] = useState("");
  const nextId = useRef(4);
  const inputRef = useRef(null);

  function onFocus() {
    setFocus(!focus);
    if (focus) {
      inputRef.current.focus();
    }
  }

  function onChange(e) {
    setText(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    const surtodo = {
      id: nextId.current,
      text,
      done: false,
    };
    dispatch({ type: "SUR_CREATE", surtodo });
    setText("");
    nextId.current += 1;
    inputRef.current.focus();
  }

  return (
    <CreateForm onSubmit={onSubmit}>
      <AddBtn onClick={onFocus}>
        <Line1 focus={focus} />
        <Line2 focus={focus}>{text}</Line2>
      </AddBtn>
      <Input
        value={text}
        ref={inputRef}
        onFocus={onFocus}
        onBlur={onFocus}
        onChange={onChange}
      />
      <SubmitBtn active={false} text={text}>
        추가
      </SubmitBtn>
    </CreateForm>
  );
}

export default React.memo(SurTodoCreate);
