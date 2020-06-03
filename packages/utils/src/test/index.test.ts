import { Index } from "..";

describe("test", () => {
  test("create new test", () => {
    const num = 1 + 2;

    expect(num).toEqual(3);
  });

  test("index class", () => {
    const index = new Index();
    expect(index).not.toBeUndefined()
  })
});
