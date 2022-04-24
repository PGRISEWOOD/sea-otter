import React, { useState } from "react";
import { debounce } from "lodash";
import { useRepos } from "../../hooks/useRepos/useRepos";

const LANGUAGES = [
  "C",
  "C++",
  "C#",
  "Go",
  "Java",
  "JavaScript",
  "PHP",
  "Python",
  "Ruby",
  "Scala",
  "TypeScript",
];

const RepoPage = () => {
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const { loading, repos } = useRepos({ search, language });
  const { items, total_count: totalCount } = repos || {};

  const handleSearch = debounce(({ target: { value } }) => {
    console.log(value);
    setSearch(value);
  }, 1000);

  const handleLanguageChange = ({ target: { value } }) => {
    console.log({ value });
    setLanguage(value);
  };

  return (
    <div className="repo-page">
      <input className="repo-page__search-input" onChange={handleSearch} />
      <select onChange={handleLanguageChange}>
        {LANGUAGES.map((lang) => (
          <option value={lang} key={lang}>
            {lang}
          </option>
        ))}
      </select>
      {!loading && (
        <div className="repo-page__repo-list">
          <h2>{`Showing ${1}-${
            items?.length
          } of ${totalCount} repositories`}</h2>
          {items?.map(({ id, name, stargazers_count: stars }) => (
            <ul key={id}>
              {name}----{stars}
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export { RepoPage };
