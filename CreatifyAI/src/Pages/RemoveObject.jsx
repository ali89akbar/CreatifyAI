import { Scissors, Sparkles } from 'lucide-react';
import React from 'react'

function RemoveObject() {
  
    const [input,setInput] = React.useState('');
    const [object, setobject] = React.useState('');
    const onSubmitHandler = (e)=>{
      e.preventDefault();
      
    }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      <form onSubmit={onSubmitHandler} action="" className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
       <div className='flex item-center '>
        <Sparkles className='w-6 pr-2 text-[#4A7AFF]'/>
        <h1 className='text-xl font-semibold'>Object Removal</h1>
    
       </div>
       <p className='text-sm mt-6 font-medium'>Upload Image</p>
       <input onChange={(e)=>setInput(e.target.files[0])} value={input} type="file" accept='image/*' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-300' required />
       <p className='text-sm text-gray-500 font-medium mt-1'>Describe object name to remove</p>
       <textarea 
       onChange={(e)=>setobject(e.target.value)} 
       value={object} 
       rows={4}  
       className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='Describe what you have to add in picture...' required />
     
       <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
        <Scissors className='w-5 '/>
        Remove Background
       </button>
      </form>
      
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>
        <div className='flex items-center gap-3'>
          <Scissors className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Processed Image</h1>

        </div>
       <div className='flex-1 flex justify-center items-center'>
        <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
          <Scissors className='w-9 h-9 ' />
          <p>Upload an image and click to Remove Object</p>
        </div>

       </div>
      </div>
    </div>
  )
}

export default RemoveObject