import React, { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { dealsActions } from "state/actions";
import { dealsSelectors } from "state/selectors";
import Template from "./Template";
import { APP_CONFIG } from "configs";

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
  // Connect redux
  const { list, fetch } = useConnect();

  const [ pageNumber, setPageNumber ] = useState(0);

  // Fetch list
  useEffect(() => {
    const params = {
      type: "personal",
      modelID: "x2 xdrive18 suv",
      page: "1"
    };
    fetch(params);
  }, [fetch]);

  // Filter handle
  const [filter, setFilter] = useState({
    engine_type: [],
    transmission: [],
    monthly_rental: {
      from: { value: null, label: "No max" },
      to: { value: null, label: "No max" }
    }
  });

  const filterList = useMemo(() => {
    setPageNumber(0)
    const { engine_type, transmission, monthly_rental } = filter
    return _.filter(list, item => {
      let passed = false
      if (engine_type.length === 0) {
        passed = true
      } else if (engine_type.length !== 0 && _.includes(engine_type, item.engine_type)) {
        passed = true
      } else {
        return;
      }

      if (transmission.length === 0) {
        passed = true
      } else if (transmission.length !== 0 && _.includes(transmission, item.transmission)) {
        passed = true
      } else {
        return;
      }

      if ( monthly_rental.from.value === null && monthly_rental.to.value === null ){
        passed = true
      } else if (monthly_rental.from.value <= item.monthly_rental && monthly_rental.to.value >= item.monthly_rental) {
        passed = true
      } else if (monthly_rental.from.value === null && monthly_rental.to.value >= item.monthly_rental) {
        passed = true
      } else if (monthly_rental.from.value <= item.monthly_rental && monthly_rental.to.value === null) {
        passed = true
      } else {
        return;
      }
      
      return passed && item;
    });
  }, [list, filter]);
  const filterArray = useCallback(
    (key, values) => {
      setFilter({
        ...filter,
        [key]: _.map(values, value => value.value)
      })
    },
    [filter],
  );

  const setFilterMonthly = useCallback(
    (key, value) => {
      setFilter({
        ...filter,
        monthly_rental: {
          ...filter.monthly_rental,
          [key]: value
        }
      })
    },
    [filter],
  );

  // pagination handle

  const totalLength = useMemo(() => {
    return filterList.length
  }, [filterList])

  const paginatedList = useMemo(() => {
    return _.slice(filterList, pageNumber * APP_CONFIG.pageSize, (pageNumber + 1) * APP_CONFIG.pageSize);
    }, [filterList, pageNumber],
  )

  return <Template 
    list={paginatedList}
    pageNumber={pageNumber}
    setPageNumber={setPageNumber}
    totalLength={totalLength} 
    filter={filter} 
    setFilter={filterArray} 
    setFilterMonthly={setFilterMonthly} 
  />;
};

export default App;
