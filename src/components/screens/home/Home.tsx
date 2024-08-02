import React from 'react'
import { toast } from 'react-toastify'


const Home = () => {
const check = ()=>{
  toast.success("welcome to home page")
}
 check()

  return (
    <div>Home</div>
  )
}

export default Home