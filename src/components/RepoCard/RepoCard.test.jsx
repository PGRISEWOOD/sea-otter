import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { RepoCard } from "./RepoCard";

const REPO_MOCK = {
  name: "someRepoName",
  url: "html_url",
  homepage: "homepage",
  stars: 3,
};

test("renders repo card", () => {
  render(<RepoCard repo={REPO_MOCK} />);

  const nameElement = screen.getByText(/someRepoName/i);
  expect(nameElement).toBeInTheDocument();
});

it("renders snapshot correctly", () => {
  const tree = renderer.create(<RepoCard repo={REPO_MOCK} />).toJSON();
  expect(tree).toMatchSnapshot();
});
