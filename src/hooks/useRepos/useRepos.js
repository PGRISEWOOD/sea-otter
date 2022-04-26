import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REPO_EVENTS } from "../../store/reposSaga";

const useRepos = ({ search, language, page }) => {
  const dispatch = useDispatch();
  const {
    items: repos,
    totalCount,
    loading,
    error,
  } = useSelector((state) => state);
  const hasMore = totalCount > repos?.length;

  useEffect(() => {
    dispatch({
      type: REPO_EVENTS.SEARCH_REQUESTED,
      payload: { search, language, page },
    });
  }, [search, language, page]);

  return { loading, repos, totalCount, hasMore, error };
};

export { useRepos };
