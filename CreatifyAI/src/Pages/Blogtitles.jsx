import { Hash, Sparkles } from 'lucide-react';
import React from 'react'

function Blogtitles() {
    const BlogCategories = [
      'General','Technology','Health','Finance','Travel','Food','Lifestyle','Education','Entertainment','Sports'
    ]
    const [selectedCategory,setSelectedCategory] = React.useState(BlogCategories[0])
    const [input,setInput] = React.useState('');
    const onSubmitHandler = (e)=>{
      e.preventDefault();
      
    }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      <form onSubmit={onSubmitHandler} action="" className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
       <div className='flex item-center '>
        <Sparkles className='w-6 pr-2 text-[#8E37EB]'/>
        <h1 className='text-xl font-semibold'>AI title Generator</h1>
    
       </div>
       <p className='text-sm mt-6 font-medium'>Keyword</p>
       <input onChange={(e)=>setInput(e.target.value)} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='Future of AI is...' required />
       <p className='mt-6 text-sm font-medium'>Category</p>
       <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>{BlogCategories.map((item,index)=>(
        <span onClick={()=> setSelectedCategory(item)} 
        className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedCategory === item ? 'bg-purple-50 text-purple-500' : 'text-gray-300 border-gray-300 '}`} key={item}>{item}</span>
       ))}
       </div>
       <br/>
       <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
        <Hash className='w-5 '/>
        Generate Title
       </button>
      </form>
      
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>
        <div className='flex items-center gap-3'>
          <Hash className='w-5 h-5 text-[#8E37EB]' />
          <h1 className='text-xl font-semibold'>Generated titles</h1>

        </div>
       <div className='flex-1 flex justify-center items-center'>
        <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
          <Hash className='w-9 h-9' />
          <p>Enter a topic and click Generate Title to get started</p>
        </div>

       </div>
      </div>
    </div>
  )
}

export default Blogtitles