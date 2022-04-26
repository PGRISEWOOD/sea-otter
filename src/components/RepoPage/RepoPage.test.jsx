import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { RepoPage } from "./RepoPage";
import * as hooks from "../../hooks/useRepos/useRepos";

describe("Repo Page", () => {
  test("Renders repo page with empty repos", () => {
    jest.spyOn(hooks, "useRepos").mockImplementation(() => ({
      repos: [],
    }));
    render(<RepoPage>{({ name }) => <span>{name}</span>}</RepoPage>);
    const searchInput = screen.getByTestId(/search-input/i);
    expect(searchInput).toBeInTheDocument();
  });

  test("Renders repo page with error alert", () => {
    jest.spyOn(hooks, "useRepos").mockImplementation(() => ({
      repos: [],
      error: "some error",
    }));
    render(<RepoPage>{({ name }) => <span>{name}</span>}</RepoPage>);
    const searchInput = screen.getByTestId(/error-alert/i);
    expect(searchInput).toBeInTheDocument();
  });

  test("Renders repo page with load more button", () => {
    jest.spyOn(hooks, "useRepos").mockImplementation(() => ({
      repos: [{ name: "react" }],
      hasMore: true,
      loading: false,
    }));
    render(<RepoPage>{({ repos }) => <span>{repos.length}</span>}</RepoPage>);
    const searchInput = screen.getByTestId(/load-more-button/i);
    expect(searchInput).toBeInTheDocument();
  });

  test("Use repos should be called with default params", () => {
    const useRepos = jest.spyOn(hooks, "useRepos");
    useRepos.mockImplementation(() => ({
      repos: [{ name: "react" }],
      hasMore: true,
      loading: false,
    }));
    render(<RepoPage>{({ repos }) => <span>{repos.length}</span>}</RepoPage>);

    expect(useRepos).toBeCalledWith({
      language: "JavaScript",
      page: 1,
      search: "",
    });
  });

  test("Load more button click should increase page value to hook", () => {
    const useRepos = jest.spyOn(hooks, "useRepos");
    useRepos.mockImplementation(() => ({
      repos: [{ name: "react" }],
      hasMore: true,
      loading: false,
    }));
    render(<RepoPage>{({ repos }) => <span>{repos.length}</span>}</RepoPage>);

    expect(useRepos).toHaveBeenCalledWith({
      language: "JavaScript",
      page: 1,
      search: "",
    });

    const loadMore = screen.getByTestId(/load-more-button/i);
    fireEvent.click(loadMore);
    expect(useRepos).toHaveBeenCalledWith({
      language: "JavaScript",
      page: 2,
      search: "",
    });
  });

  test("Select language change should pass value to hook", () => {
    const useRepos = jest.spyOn(hooks, "useRepos");
    useRepos.mockImplementation(() => ({
      repos: [{ name: "react" }],
      hasMore: true,
      loading: false,
    }));
    render(<RepoPage>{({ repos }) => <span>{repos.length}</span>}</RepoPage>);

    expect(useRepos).toHaveBeenCalledWith({
      language: "JavaScript",
      page: 1,
      search: "",
    });

    const languageSelect = screen.getByDisplayValue(/JavaScript/i);
    expect(languageSelect.value).toEqual("JavaScript");
    fireEvent.change(languageSelect, { target: { value: "C" } });
    expect(useRepos).toHaveBeenCalledWith({
      language: "C",
      page: 1,
      search: "",
    });
  });

  test("Search input change should pass value to hook", async () => {
    const useRepos = jest.spyOn(hooks, "useRepos");
    useRepos.mockImplementation(() => ({
      repos: [{ name: "react" }],
      hasMore: true,
      loading: false,
    }));
    render(<RepoPage>{({ repos }) => <span>{repos.length}</span>}</RepoPage>);

    expect(useRepos).toHaveBeenCalledWith({
      language: "JavaScript",
      page: 1,
      search: "",
    });

    const searchInput = screen.getByLabelText(/Search repositories/i);
    expect(searchInput.value).toEqual("");

    await act(async () => {
      jest.useFakeTimers();
      fireEvent.change(searchInput, { target: { value: "node" } });
      expect(searchInput.value).toEqual("node");
      jest.advanceTimersByTime(2000);
    });

    expect(useRepos).toHaveBeenCalledWith({
      language: "JavaScript",
      page: 1,
      search: "node",
    });
  });
});
