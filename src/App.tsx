import {useEffect, useState} from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const [callStatus, setCallStatus] = useState(200);

    useEffect(() => {
        fetch("https://example.com/").then((response) => {
            setCallStatus(response.status)
        })
    }, [])

    return (
        <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
            <p>{callStatus}</p>
        </div>
    )
}

export default App
