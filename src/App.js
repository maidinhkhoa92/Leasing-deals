import React, { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { dealsActions } from "state/actions";
import { dealsSelectors } from "state/selectors";
import Template from "./Template";

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

  return <Template list={filterList} filter={filter} setFilter={filterArray} setFilterMonthly={setFilterMonthly} />;
};

export default App;
