import { Hash, Sparkles,Image } from 'lucide-react';
import React from 'react'

function GenerateImage() {
    const imageStyle = [
      '3D style','Anime','Cartoon','Realistic','Pixel Art','Surrealist']
    const [selectedStyle,setSelectedStyle] = React.useState(imageStyle[0])
    const [input,setInput] = React.useState('');
    const [publish,setPublish] = React.useState(false);
    const onSubmitHandler = (e)=>{
      e.preventDefault();
      
    }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      <form onSubmit={onSubmitHandler} action="" className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
       <div className='flex item-center '>
        <Sparkles className='w-6 pr-2 text-[#00AD25]'/>
        <h1 className='text-xl font-semibold'>AI Image Generator</h1>
    
       </div>
       <p className='text-sm mt-6 font-medium'>Describe your image </p>
       <textarea onChange={(e)=>setInput(e.target.value)} value={input} rows={4}  className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='Describe what you have to generate in picture...' required />
       <p className='mt-6 text-sm font-medium'>Style</p>
       <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>{imageStyle.map((item)=>(
        <span onClick={()=> setSelectedStyle(item)} 
        className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedStyle === item ? 'bg-purple-50 text-purple-500' : 'text-gray-300 border-gray-300 '}`} key={item}>{item}</span>
       ))}
       </div>
       <br/>
       <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
        <Hash className='w-5 '/>
        Generate Title
       </button>
      </form>
      
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>
        <div className='flex items-center gap-3'>
          <Image className='w-5 h-5 text-[#8E37EB]' />
          <h1 className='text-xl font-semibold'>Generated Image</h1>

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

export default GenerateImage;