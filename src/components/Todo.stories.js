import Todo from "./Todo";

// storybook에게 우리가 문서화 하고 있는 컴포넌트에 대해 알려주기 위해,
// default export를 생성한다
export default {
  component: Todo,
  title: "TODO/Todo",
};

const Template = (args) => <Todo {...args} />;

/* 

1.스토리는 주어진 state안에서 렌더링된 요소를 리던하는 함수다.
2.Template.bind({}는 함수의 복사본을 만드는 자바스크립트의 한 기법이다. 
  이 기법을 사용하여 각각의 스토리가 고유한 속성을 갖지만, 동시에 동일한 구현을 사용하도록 할 수 있다
3.ars(arguments)의 값이 변하면, 컴포넌트도 함께 변한다
4. 액션(Actions)은 UI컴포넌트를 독립적으로 만들 때, 컴포넌트와의 상호작용을 확인하는데 도움을 준다
*/
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

export const Checked = Template.bind({});
Checked.args = {
  todo: {
    ...Default.args.todo,
    state: "TODO_CHECKED",
  },
};
