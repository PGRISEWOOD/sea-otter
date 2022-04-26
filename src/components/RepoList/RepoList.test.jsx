/* eslint-disable react/prop-types */
import React from "react";
import { render, screen } from "@testing-library/react";
import { RepoList } from "./RepoList";
import { RepoCard } from "../RepoCard/RepoCard";

const REPOS_MOCK = [
  {
    id: 1,
    name: "someRepoName-1",
    url: "html_url",
    homepage: "homepage",
    stars: 3,
  },
  {
    id: 2,
    name: "someRepoName-2",
    url: "html_url2",
    homepage: "homepage2",
    stars: 9,
  },
];

test("renders repo list", () => {
  const RepoCompStub = ({ repo: { name } }) => <span key={name}>{name}</span>;

  render(
    <RepoList repos={REPOS_MOCK} totalCount={99}>
      {RepoCompStub}
    </RepoList>
  );

  const elements = screen.getAllByText(/someRepoName-/i);
  expect(elements.length).toEqual(2);
});

test("renders repo list as RepoCards", () => {
  render(
    <RepoList repos={REPOS_MOCK} totalCount={99}>
      {RepoCard}
    </RepoList>
  );

  const elements = screen.getAllByText(/someRepoName-/i);
  expect(elements.length).toEqual(2);
});
