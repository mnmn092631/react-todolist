import Head from "./components/Head";
import Template from "./components/Template";
import SurTodoList from "./components/surtodo/SurTodoList";
import SurTodoCreate from "./components/SurTodoCreate";
import { TodoProvider } from "./components/TodoContext";

function App() {
  return (
    <TodoProvider>
      <Template>
        <Head />
        <SurTodoCreate />
        <SurTodoList />
      </Template>
    </TodoProvider>
  );
}

export default App;
