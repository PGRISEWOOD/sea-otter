import { fetchRepos } from "./fetchRepos";

const MOCK_REPOS = {
  incomplete_results: true,
  items: [{ id: 126577260, name: "someRepoName" }],
  total_count: 14925106,
};

describe("Fetch repos", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  beforeEach(() => {
    global.fetch.mockClear();
  });

  test("fetch repos returns json on success", async () => {
    global.fetch.mockReturnValueOnce(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(MOCK_REPOS),
      })
    );
    const search = "";
    const language = "JavaScript";
    const page = 1;

    const result = await fetchRepos({ search, language, page });
    expect(result).toEqual(MOCK_REPOS);
  });

  test("fetch repos returns json on success", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(MOCK_REPOS),
      })
    );
    const search = "";
    const language = "JavaScript";
    const page = 1;

    const result = await fetchRepos({ search, language, page });
    expect(result).toEqual(MOCK_REPOS);
  });

  test("fetch repos returns error on ok false", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Some Error" }),
      })
    );

    expect(() => fetchRepos({})).rejects.toThrow("Some Error");
  });
});
