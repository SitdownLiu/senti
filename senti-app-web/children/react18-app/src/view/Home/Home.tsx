import React, { useState } from "react";
import s from './style.module.less';
export const Home: React.FC = () => {
    const [count, setCount] = useState(0)
    return (
        <div className={s.wrapper}>
            <h1>
                Home Page
            </h1>
            <div>
                {count}
            </div>
            <div>
                <button onClick={() => setCount(count + 1)}>Add +</button>
            </div>
        </div>
    )
}
