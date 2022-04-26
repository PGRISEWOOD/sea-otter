const GIT_HUB_BASE_URL = "https://api.github.com/search/repositories?q=";

const fetchRepos = async ({ search = "", language = "Python", page = 1 }) => {
  const queryString = `language:${encodeURIComponent(
    language
  )} ${encodeURIComponent(search)} in:name&page=${page}&sort=stars`;

  const options = process.env.REACT_APP_NOT_SECRET_PAT
    ? {
        headers: {
          Authorization: `token ${process.env.REACT_APP_NOT_SECRET_PAT}`,
        },
      }
    : {};

  const response = await fetch(`${GIT_HUB_BASE_URL}${queryString}`, options);
  const json = await response.json();
  if (!response.ok) {
    throw Error(json.message);
  }
  return json;
};

export { fetchRepos };
