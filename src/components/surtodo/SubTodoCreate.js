import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useTodoDispatch } from "./../TodoContext";

const CreateForm = styled.form`
  position: relative;
  display: flex;
  width: 100%;
  margin-top: 2%;
  padding: 0 2%;
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

const Line1 = styled.div`
  position: absolute;
  top: 0;
  left: 8px;
  width: 4px;
  height: 20px;
  background-color: #978174;
  border-radius: 10px;
`;

const Input = styled.input.attrs({
  type: "text",
})`
  flex: 1;
  padding: 2%;
  font-size: 20px;
  color: transparent;
  text-shadow: 0 0 0 #534842;

  &::placeholder {
    color: #eee9e5;
  }

  &:focus::placeholder {
    opacity: 0;
  }
`;

const SubmitBtn = styled.button.attrs({
  type: "submit",
})`
  padding: 2%;
  font-size: 17px;
  font-weight: 600;
  color: ${(props) => (props.text.length > 0 ? "#978174" : "#EEE9E5")};
  pointer-events: ${(props) => props.text.length === 0 && "none"};
  transition: opacity 250ms ease-in;
`;

function SubTodoCreate({ surtodoId }) {
  const dispatch = useTodoDispatch();

  const [focus, setFocus] = useState(false);
  const [text, setText] = useState("");
  const nextId = useRef(4);
  const inputRef = useRef(null);

  function onFocus() {
    setFocus(!focus);
  }

  function onChange(e) {
    setText(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    const subtodo = {
      id: nextId.current,
      surtodo: surtodoId,
      text,
      done: false,
    };
    dispatch({ type: "SUB_CREATE", subtodo });
    setText("");
    nextId.current += 1;
    inputRef.current.focus();
  }

  return (
    <CreateForm onSubmit={onSubmit}>
      <AddBtn>
        <Line1 />
      </AddBtn>
      <Input
        value={text}
        ref={inputRef}
        onFocus={onFocus}
        onBlur={onFocus}
        onChange={onChange}
        autoFocus={true}
      />
      <SubmitBtn text={text}>추가</SubmitBtn>
    </CreateForm>
  );
}

export default React.memo(SubTodoCreate);
