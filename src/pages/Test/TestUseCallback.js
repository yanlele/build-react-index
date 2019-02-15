import React from 'react';

export default function TestUseCallback({ num }) {
    const memoizedCallback = React.useCallback(
        () => {
            // 一些计算
            return num;
        },
        [],
    );
    console.log('记忆 num > ', memoizedCallback());
    console.log('原始 num > ', num);
    return (
        <div>
            <p>TestUseCallback</p>
        </div>
    )
}
