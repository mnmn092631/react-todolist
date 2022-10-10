import React, { createContext, useContext, useReducer } from "react";

const initialTodos = {
  surtodos: [
    { id: 1, text: "장 보기", done: false },
    { id: 2, text: "학교 가기", done: true },
    { id: 3, text: "독서", done: false },
  ],
  subtodos: [
    { id: 1, surtodo: 1, text: "당근", done: false },
    { id: 2, surtodo: 1, text: "오이", done: true },
    { id: 3, surtodo: 2, text: "경제학사", done: false },
  ],
};

function todoReducer(state, action) {
  switch (action.type) {
    case "SUR_CREATE":
      return {
        ...state,
        surtodos: state.surtodos.concat(action.surtodo),
      };
    case "SUB_CREATE":
      return {
        ...state,
        subtodos: state.subtodos.concat(action.subtodo),
      };

    case "SUR_CHECK":
      return {
        ...state,
        surtodos: state.surtodos.map((surtodo) =>
          surtodo.id === action.id ? { ...surtodo, done: action.done } : surtodo
        ),
      };
    case "SUB_CHECK":
      return {
        ...state,
        subtodos: state.subtodos.map((subtodo) =>
          subtodo.id === action.id ? { ...subtodo, done: action.done } : subtodo
        ),
      };
    case "SUR_DONE":
      return {
        ...state,
        subtodos: state.subtodos.map((subtodo) =>
          subtodo.surtodo === action.surtodo
            ? { ...subtodo, done: true }
            : subtodo
        ),
      };

    case "SUR_UPDATE":
      return {
        ...state,
        surtodos: state.surtodos.map((surtodo) =>
          surtodo.id === action.id
            ? { ...surtodo, text: action.value }
            : surtodo
        ),
      };
    case "SUB_UPDATE":
      return {
        ...state,
        subtodos: state.subtodos.map((subtodo) =>
          subtodo.id === action.id
            ? { ...subtodo, text: action.value }
            : subtodo
        ),
      };

    case "SUR_REMOVE":
      return {
        ...state,
        surtodos: state.surtodos.filter((surtodo) => surtodo.id !== action.id),
        subtodos: state.subtodos.filter(
          (subtodo) => subtodo.surtodo !== action.id
        ),
      };
    case "SUB_REMOVE":
      return {
        ...state,
        subtodos: state.subtodos.filter((subtodo) => subtodo.id !== action.id),
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}
