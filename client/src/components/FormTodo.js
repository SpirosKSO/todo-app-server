import { Form, Input, Button, Flex } from "antd";

const FormTodo = ({ createTodo, text, setText }) => {
  return (
    <Flex gap="middle" vertical align="center">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="I want to do .."
        size="large"
      ></Input>

      <Form.Item>
        <Button onClick={createTodo} type="primary">
          Add Todo
        </Button>
      </Form.Item>
    </Flex>
  );
};

export default FormTodo;
