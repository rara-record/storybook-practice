import Todo from "./Todo";

export default {
  component: Todo,
  title: "Todo",
};

const Template = (args) => <Todo {...args} />;

export const Default = Template.bind({});
Default.args = {
  todo: {
    id: "1",
    title: "Test Todo",
    state: "TODO_INBOX",
    updateAt: new Date(2022, 0, 1, 9, 0),
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  todo: {
    ...Default.args.todo,
    state: "TODO_PINNED",
  },
};

export const Finished = Template.bind({});
Finished.args = {
  todo: {
    ...Default.args.todo,
    state: "TODO_Finished",
  },
};
