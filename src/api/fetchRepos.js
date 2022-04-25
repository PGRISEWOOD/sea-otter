const GIT_HUB_BASE_URL = "https://api.github.com/search/repositories?q=";

const fetchRepos = ({ search = "", language = "Python", page = 1 }) => {
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

  return fetch(`${GIT_HUB_BASE_URL}${queryString}`, options).then((response) =>
    response.json()
  );
};

export { fetchRepos };
