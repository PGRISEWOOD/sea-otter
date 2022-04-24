import { useEffect, useState } from "react";
import { fetchRepos } from "../../api/fetchRepos";

const useRepos = ({ search, language }) => {
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState(null);

  const searchRepos = () => {
    setLoading(true);
    fetchRepos({ search, language }).then((data) => {
      setRepos(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    searchRepos();
  }, [search, language]);

  return { loading, repos };
};

export { useRepos };
