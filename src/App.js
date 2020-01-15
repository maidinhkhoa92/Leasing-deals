import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dealsActions } from "state/actions";
import { dealsSelectors } from "state/selectors";
import Template from './Template';

const useConnect = () => {
  // mapState
  const list = useSelector(dealsSelectors.getList);

  const mapState = {
    list
  };

  // mapDispatch
  const dispatch = useDispatch();
  const mapDispatch = useMemo(
    () => ({
      fetch: params => dispatch(dealsActions.fetch(params))
    }),
    [dispatch]
  );

  return {
    ...mapState,
    ...mapDispatch
  };
};

const App = () => {
  const { list, fetch } = useConnect();

  useEffect(() => {
    const params = {
      type: "personal",
      modelID: "x2 xdrive18 suv",
      page: "1"
    };
    fetch(params);
  }, [fetch]);
  
  return <Template list={list} />;
};

export default App;
