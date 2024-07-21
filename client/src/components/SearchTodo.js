import Input from "antd/es/input/Input";
import { SearchOutlined } from "@ant-design/icons";
import { Flex } from "antd";

const SearchTodo = ({ searchInput, setSearchInput }) => {
  return (
    <div>
      <Flex vertical align="center">
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for a todo"
          prefix={<SearchOutlined />}
          size="large"
          style={{ width: "300px" }}
        />
      </Flex>
    </div>
  );
};

export default SearchTodo;
