import TodoSection from "./TodoSection";
import { store } from "../lib/store/config";
import { rest } from "msw";
import { MockedState } from "./TodoList.stories";
import { Provider } from "react-redux";

import {
  fireEvent,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from "@storybook/testing-library";

export default {
  component: TodoSection,
  title: "TODO/TodoSection",
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

const Template = () => <TodoSection />;

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        "https://jsonplaceholder.typicode.com/todos?userId=1",
        (req, res, ctx) => {
          return res(ctx.json(MockedState.todos));
        }
      ),
    ],
  },
};

export const Error = Template.bind({});
Error.parameters = {
  msw: {
    handlers: [
      rest.get(
        "https://jsonplaceholder.typicode.com/todos?userId=1",
        (req, res, ctx) => {
          return res(ctx.status(403));
        }
      ),
    ],
  },
};
