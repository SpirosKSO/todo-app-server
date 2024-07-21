import { Link } from "react-router-dom";

const FilterTodos = ({ isPressed, title, setFilter }) => {
  return (
    <Link
      className="btn toggle-btn"
      aria-pressed={isPressed}
      onClick={() => setFilter(title)}
      style={{ textDecoration: "none" }}
      to={`/todo/${title}`}
    >
      <span style={{ visibility: "hidden" }}>Show </span>
      <span>{title}</span>

      <span style={{ visibility: "hidden" }}> tasks</span>
    </Link>
  );
};

export default FilterTodos;
