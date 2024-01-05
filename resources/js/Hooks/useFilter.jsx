import React, { useEffect, useState } from "react";

const useFilter = (
    array = [],
    functions = {
        all: (a) => {
            return a;
        },
    },
    currentFilter = 'all'
) => {
    const [filter, setFilter] = useState(currentFilter);
    const [filteredArray, setFilteredArray] = useState(array.filter(functions[currentFilter]));

    useEffect(() => {
        setFilteredArray(array.filter(functions[filter]));
    }, [filter]);

    return [filter, setFilter, filteredArray];
};

export default useFilter;
