import React from "react";
import styled from "styled-components";
import { useTodoState } from "./TodoContext";

const HeadBlock = styled.div`
  width: 100%;
  height: 25%;
  padding: 8%;
  background-color: #534842;
  color: #fff;
  font-weight: 600;
  letter-spacing: -0.05em;

  .tasks-left {
    display: block;
    font-size: 17px;
  }
`;

const Today = styled.div`
  margin-bottom: 8%;

  .date {
    font-size: 24px;
  }

  .day {
    display: block;
    font-size: 20px;
  }
`;

function Head() {
  const { surtodos } = useTodoState();
  const undoneTasks = surtodos.filter((surtodo) => !surtodo.done);

  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleDateString("ko-KR", { weekday: "long" });

  return (
    <HeadBlock>
      <Today>
        <h1 className="date">{dateString}</h1>
        <span className="day">{dayName}</span>
      </Today>
      <span className="tasks-left">할 일 {undoneTasks.length}개 남음</span>
    </HeadBlock>
  );
}

export default Head;
