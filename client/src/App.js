import { Routes, Route, useParams } from "react-router-dom";
import FilterTodos from "./components/FilterTodos";

import TodoList from "./components/TodoList";

const App = () => {
  const { text } = useParams();
  return (
    <div>
      <Routes>
        <Route path={`/todo/:${text}`} element={<FilterTodos />}></Route>
      </Routes>
      <TodoList />
    </div>
  );
};

export default App;
