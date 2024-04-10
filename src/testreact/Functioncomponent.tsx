import { useState } from "react"

export default function Test(){
    const [count, setCount] = useState(0)

    const increase = () => {
        setCount(count+1)
    }

    return(
        <>
        <h1>Function component</h1>
        <h2>Count: {count}</h2>
        <button onClick={increase}>Increase</button>
    </>
    )
}