import { useState } from "react"

export default function Test(){
    const [count, setCount] = useState(10)

    return(
        <h1>Count : {count}</h1>
    )
}