const GIT_HUB_BASE_URL = "https://api.github.com/search/repositories?q=";

const fetchRepos = ({ search = "", language = "Python" }) => {
  const queryString = encodeURIComponent(
    `language:${language} ${search} in:name`
  );

  const options = process.env.REACT_APP_NOT_SECRET_PAT
    ? {
        headers: {
          Authorization: `token ${process.env.REACT_APP_NOT_SECRET_PAT}`,
        },
      }
    : {};

  return fetch(`${GIT_HUB_BASE_URL}${queryString}`, options).then(
    (response) => response.json(),
    (error) => console.error({ error })
  );
};

export { fetchRepos };
