import React, {useState, useEffect} from 'react';
import TestUseCallback from './TestUseCallback';

function Example() {
    const [num, setNum] = useState([1, 2, 3]);
    const handleClick = () => {
        setNum(num.map((item)=> item * 2));
    };
    return (
        <div>
            <button onClick={handleClick}>
                click me
            </button>
            <TestUseCallback num={num}/>
        </div>
    )
}
export default Example;
