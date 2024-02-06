import axios from "axios"
import { useEffect } from "react"

function App() {

  const makeRequest = async (url:string) => {
    console.log("Who are you?")
    const res = await axios.get(url)
    console.log(res.data)
  }
  useEffect(() => {
      return () => {
      console.log(`I am ${import.meta.env.VITE_APP_NAME}`)
      if(import.meta.env.VITE_API_URL) {
        makeRequest(import.meta.env.VITE_API_URL)
      }
    }
  },[])  
  return (
    <>
      <h1>Micro Frontend with React and Vite</h1>
      <h2>APP NAME: {import.meta.env.VITE_APP_NAME}</h2>
      <h2>APP PORT: {import.meta.env.VITE_APP_PORT}</h2>
    </>
  )
}

export default App
