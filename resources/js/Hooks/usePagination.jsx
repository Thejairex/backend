import React from 'react'

const usePagination = (array, currentItemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(currentItemsPerPage);
    const [currentItems, setCurrentItems] = React.useState([]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItemsArray = array.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    React.useEffect(() => {
        setCurrentItems(currentItemsArray);
    }, [currentItemsArray]);

    return [currentItems, itemsPerPage, setItemsPerPage, paginate, currentPage];
}

export default usePagination