import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"

function App() {
  const {isLoading, error, isAuthenticated, user, loginWithRedirect, logout, getAccessTokenSilently} = useAuth0()

  const [token, setToken] = useState<string | null>(null)
  
  const makeRequest = async (url:string) => {
    if(!token){
      try{
        const accessToken = await getAccessTokenSilently()
        setToken(accessToken)
      }catch(err){
        console.error(err)
        return
      }
    }
    const res = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}})
    console.log(res.data)
  }

  useEffect(() => {
    return () => {
      console.log(`I am ${import.meta.env.VITE_APP_NAME}`)
      if(import.meta.env.VITE_API_URL) {
        console.log("Who are you?")
        makeRequest(import.meta.env.VITE_API_URL+"/whoareyou")
      }
    }
  },[])  

  useEffect(() => {
    console.log("user",user);
    console.log("token",token);    
    if(isAuthenticated){
        console.log("Who am I?")
        makeRequest(import.meta.env.VITE_API_URL+"/whoami")
    }
  },[user,token,isAuthenticated])
  return (
    <>
    {isLoading && <div>Loading...</div>}
    {error && <div>Oops... {error.message}</div>}
    {isAuthenticated ? (
      <>
      <h1>Micro Frontend with React and Vite</h1>
      <h2>APP NAME: {import.meta.env.VITE_APP_NAME}</h2>
      <h2>APP PORT: {import.meta.env.VITE_APP_PORT}</h2>
      <button onClick={()=>logout()}>Log out</button>
      </>
    ) : (
      <button onClick={()=>loginWithRedirect()}>Log in</button>
    )}
    </>
  )
}

export default App
