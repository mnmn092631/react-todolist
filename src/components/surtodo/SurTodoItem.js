import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import {
  MdDone,
  MdExpandMore,
  MdExpandLess,
  MdMoreHoriz,
} from "react-icons/md";
import SubTodoList from "../subtodo/SubTodoList";
import SurMoreModal from "./SurMoreModal";
import SubTodoCreate from "./SubTodoCreate";
import { useTodoState } from "../TodoContext";
import { useTodoDispatch } from "./../TodoContext";

const SurTodoItemBlock = styled.div`
  padding: 3% 0;

  &:last-child {
    padding: 3% 0 0;
  }
`;

const MainTodoItemBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const CheckCircle = styled.div`
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
  font-size: 17px;
  font-weight: 600;
  color: #978174;
`;

const SubTodoToggle = styled.button`
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

const ProgressBar = styled.div`
  width: 100%;
  height: 2px;
  background-color: #978174;
`;

const Progress = styled.div`
  width: calc(100% * ${(props) => props.percent});
  height: 2px;
  background-color: #eee9e5;
  transition: width 350ms ease-in-out;
`;

function SurTodoItem({ id, text, done }) {
  const dispatch = useTodoDispatch();
  const { subtodos } = useTodoState();

  function onCheck() {
    dispatch({ type: "SUR_CHECK", id, done: !done });
  }
  useEffect(() => {
    done && dispatch({ type: "SUR_DONE", surtodo: id });
  }, [dispatch, done, id]);

  const [subTodoOpen, setSubTodoOpen] = useState(false);
  function subTodoToggleClick() {
    setSubTodoOpen(!subTodoOpen);
  }

  const [moreOpen, setMoreOpen] = useState(false);
  function moreToggleClick() {
    setMoreOpen(!moreOpen);
  }

  const [addOpen, setAddOpen] = useState(false);

  const subtodo = subtodos.filter((subtodo) => subtodo.surtodo === id);
  const subtodoDone = subtodo.filter((subtodo) => subtodo.done === true);

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
    dispatch({ type: "SUR_UPDATE", value, id });
  }

  const inputRef = useRef(null);

  return (
    <SurTodoItemBlock>
      <MainTodoItemBlock>
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
          <SubTodoToggle
            open={subTodoOpen}
            onClick={subTodoToggleClick}
            done={done}
          >
            {subtodo.length > 0 &&
              (subTodoOpen ? (
                <MdExpandLess size="25px" />
              ) : (
                <MdExpandMore size="25px" />
              ))}
          </SubTodoToggle>
        )}
        {read && (
          <More done={done} open={moreOpen} onClick={moreToggleClick}>
            <MdMoreHoriz size="25px" />
            {moreOpen && (
              <SurMoreModal
                id={id}
                addOpen={addOpen}
                setAddOpen={setAddOpen}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
                read={read}
                setRead={setRead}
                setSubTodoOpen={setSubTodoOpen}
              />
            )}
          </More>
        )}
      </MainTodoItemBlock>
      {subtodo.length > 0 && (
        <ProgressBar>
          <Progress percent={subtodoDone.length / subtodo.length} />
        </ProgressBar>
      )}
      {addOpen && <SubTodoCreate surtodoId={id} />}
      <SubTodoList surtodoId={id} open={subTodoOpen} />
    </SurTodoItemBlock>
  );
}

export default React.memo(SurTodoItem);
