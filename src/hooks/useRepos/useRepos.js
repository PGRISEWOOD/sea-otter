import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepos } from "../../api/fetchRepos";
import { appendRepos, setRepos } from "../../store/repoSlice";

const useRepos = ({ search, language, page = 1 }) => {
  const [loading, setLoading] = useState(true);

  const { items: repos, totalCount } = useSelector((state) => state.repos);

  const dispatch = useDispatch();

  const searchRepos = (cb) => {
    setLoading(true);
    fetchRepos({ search, language, page }).then(
      (data) => {
        setLoading(false);
        dispatch(cb(data));
      },
      (error) => console.error({ error })
    );
  };

  useEffect(() => {
    searchRepos(setRepos);
  }, [search, language]);

  useEffect(() => {
    if (page !== 1) searchRepos(appendRepos);
  }, [page]);

  return { loading, repos, totalCount, hasMore: totalCount > repos?.length };
};

export { useRepos };
