import React from "react";
import { shallow, mount, render } from "enzyme";
import enzymeSetup from "../utils/enzymeSetup";
import App from "./App";
import items from "../constants/items";

describe("App smoke test", () => {
  const initialState = {
    items: items
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  test("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("App tests", () => {
  const initialState = {
    items: items
  };

  let rendered;

  beforeEach(() => {
    rendered = mount(<App />);
  });

  it("sets default state", () => {
    expect(rendered.state().items).toEqual(initialState.items);
  });

  it("shows a zero for score", () => {
    expect(rendered.find(".total").length).toEqual(1);
    expect(rendered.find(".total").text()).toEqual("0");
  });

  it("shows a zero for bonuses", () => {
    expect(rendered.find(".bonus-value").length).toEqual(1);
    expect(rendered.find(".bonus-value").text()).toEqual("0");
  });

  it("shows content in letter button", () => {
    expect(
      rendered
        .find(".letter-button")
        .first()
        .text()
    ).toEqual("A");
  });

  it("calculates the total correctly", () => {
    rendered.setState({
      items: [
        {
          name: "A",
          value: 50,
          bonusInterval: 3,
          bonusValue: 200,
          tally: 4
        },
        {
          name: "B",
          value: 30,
          bonusInterval: 2,
          bonusValue: 90,
          tally: 0
        },
        {
          name: "C",
          value: 20,
          bonusInterval: 0,
          bonusValue: 0,
          tally: 0
        },
        {
          name: "D",
          value: 15,
          bonusInterval: 0,
          bonusValue: 0,
          tally: 0
        }
      ]
    });
    expect(rendered.find(".total").text()).toEqual("250");
  });

  it("calculates the bonus correctly", () => {
    rendered.setState({
      items: [
        {
          name: "A",
          value: 50,
          bonusInterval: 3,
          bonusValue: 200,
          tally: 4
        },
        {
          name: "B",
          value: 30,
          bonusInterval: 2,
          bonusValue: 90,
          tally: 0
        },
        {
          name: "C",
          value: 20,
          bonusInterval: 0,
          bonusValue: 0,
          tally: 0
        },
        {
          name: "D",
          value: 15,
          bonusInterval: 0,
          bonusValue: 0,
          tally: 0
        }
      ]
    });
    expect(rendered.find(".bonus-value").text()).toEqual("200");
  });
});
