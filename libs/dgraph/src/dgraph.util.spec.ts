import { getOrCreateDgraphInstance, makeDefaultOptions } from "./dgraph.util";

import { DgraphClient } from "dgraph-js";

describe("DgraphUtil", () => {
  it("getOrCreateDgraphInstance should be instance of a dgraph", () => {
    expect.hasAssertions();
    expect(
      getOrCreateDgraphInstance({
        stubs: [{}],
      }).client
    ).toBeInstanceOf(DgraphClient);
  });

  it("getOrCreateDgraphInstance should be instance of the same dgraph", () => {
    expect.hasAssertions();
    expect(
      getOrCreateDgraphInstance({
        stubs: [{}],
      }).client
    ).toBeInstanceOf(DgraphClient);
  });

  it("getOrCreateDgraphInstance should be instance of a dgraph with debug true", () => {
    expect.hasAssertions();
    expect(
      getOrCreateDgraphInstance(
        {
          debug: true,
          stubs: [{}],
        },
        true
      ).client
    ).toBeInstanceOf(DgraphClient);
  });

  it("makeDefaultOptions should be equal to an option", () => {
    expect.hasAssertions();
    expect(
      makeDefaultOptions({
        stubs: [{}],
      })
    ).toStrictEqual({
      stubs: [{}],
    });
  });

  it("makeDefaultOptions should be equal to an option with option undefined", () => {
    expect.hasAssertions();
    expect(makeDefaultOptions()).toStrictEqual({
      stubs: [],
    });
  });
});
