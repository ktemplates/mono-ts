import React from "react";

import { shallow, toJson } from "@kcutils/react-testkit";
import { Hello } from "..";

describe("test", () => {
  test("create react component", () => {
    const component = shallow(<Hello compiler="typescript" framework="webpack" />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
