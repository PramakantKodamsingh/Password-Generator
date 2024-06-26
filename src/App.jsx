import { useCallback, useEffect, useState,useRef } from 'react'

import './App.css'




export default function App() {
  const [length,setLength]=useState(10);
  const [numallowed,setNumallowed]=useState(true);
  const [charallowed,setCharallowed]=useState(true);
  const [password,setPassword]=useState("");

  const passref=useRef(null)

  const copytoclipboard=useCallback(()=>{
    passref.current ?.select();
    window.navigator.clipboard.writeText(password)
  },[password])




  const passgenerator=useCallback(()=>{

    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYXZ"

  if(numallowed){
    str=str+"0123456789"
  }
  if(charallowed===true){
    str=str+"#@!$%^&*()"
  }

  for(let i=1;i<=length;i++){
  let index=Math.floor(Math.random() * str.length+1)
   pass+=str.charAt(index)
  }

  setPassword(pass)

  },[length,numallowed,charallowed])

  useEffect(()=>{passgenerator()},[length,numallowed,charallowed])

  
  return (
    <div className='max-w-md mx-auto my-40 border border-white rounded-lg overflow-hidden bg-gray-700 text-orange-500 text-center p-3'>
      <label className='my-10'>Password Generator</label>
      <div className='flex'>
      <input type="text" value={password} className='rounded-lg my-4 w-full ' readOnly ref={passref} />
      <button onClick={copytoclipboard}className='bg-blue-700 h-7 my-4 text-white px-2 mx-2 rounded-lg'>Copy</button>
      </div>
      <div className='flex gap-x-2'>
        <div className='flex gap-x-2'>
        <input type="range" name="" id="" max={50} min={5} value={length} onChange={e=>setLength(e.target.value)} />
        <label >Length:{length}</label>
        </div>
        <div className='flex gap-x-2'>
        <input type="checkbox" name="" id="" defaultChecked={numallowed} onChange={()=>{setNumallowed((prev)=>!prev)}}/>
        <label >Numbers</label>
        </div>

        <div className='flex gap-x-2'>
        <input type="checkbox" name="" id="" defaultChecked={charallowed} onChange={()=>{setCharallowed((prev)=>!prev)}}/>
        <label >Chars</label>
        </div>


      </div>


    </div>
  )
}