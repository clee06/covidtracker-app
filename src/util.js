export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData; 
}


// ES6

// export const sortData = (data) => {
//     const sortedData = [...data];

//     return sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1);
//     return sortedData;
// }