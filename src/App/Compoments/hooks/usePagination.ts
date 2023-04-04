import React, { useState } from 'react'

interface Props {
    pageSize: number;
}

const usePagination = ({ pageSize }: Props) => {
    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(pageSize);

    const handleChange = (page: any) => {
        setCurrent(page);
        setMinIndex((page - 1) * pageSize);
        setMaxIndex(page * pageSize);
    };

    return {
        handleChange,
        current,
        minIndex,
        maxIndex ,
        pageSize
    }
}

export default usePagination


//const { current, handleChange, maxIndex, minIndex, pageSize } = usePagination({ pageSize: 8 });

// {infoFavorite.length > 0 && <Pagination
//     pageSize={pageSize}
//     current={current}
//     total={infoFavorite.length}
//     onChange={handleChange}
//     className="center"
//     style={{ marginTop: "30px" }}
// />}

// ((product, index) => index >= minIndex &&
//         index < maxIndex &&