import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import './tool.css'
function AITools() {
    const navigate = useNavigate();
    const {user} = useUser();
  return (
 <div className='px-4 sm:px-20 xl:px-32 my-24'>
    <div className='text-center'>
        <h2 className='text-slate-700 text-[42px] font-semibold'>Powerful AI Tools</h2>
        <p className='text-gray-500 max-w-lg mx-auto'>Everything you need to create, enhance and optimize your content with cutting edge AI technology</p>
    </div>
    
    <div className='flex flex-wrap justify-center mt-10 gap-6'>
        {AiToolsData.map((tool, index) => (
            <div 
                key={index} 
                className='group perspective-1000 w-80 h-64'
                onClick={() => user && navigate(tool.path)}
            >
                <div className='relative w-full h-full transform-style-preserve-3d transition-all duration-500 hover:rotate-y-8 hover:rotate-x-4 cursor-pointer'>
                    
                    {/* Main Card Face */}
                    <div className='absolute inset-0 rounded-xl overflow-hidden shadow-2xl transform translate-z-0 hover:shadow-3xl transition-shadow duration-300'>
                        
                        {/* Background Image/Pattern */}
                        <div 
                            className='absolute inset-0 opacity-10 bg-cover bg-center'
                            style={{
                                backgroundImage: `linear-gradient(135deg, ${tool.bg.from}22, ${tool.bg.to}22), 
                                                 url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='0' cy='30' r='2'/%3E%3Ccircle cx='60' cy='30' r='2'/%3E%3Ccircle cx='30' cy='0' r='2'/%3E%3Ccircle cx='30' cy='60' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                            }}
                        ></div>
                        
                        {/* Gradient Overlay */}
                        <div 
                            className='absolute inset-0 opacity-5'
                            style={{
                                background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`
                            }}
                        ></div>
                        
                        {/* Content */}
                        <div className='relative z-10 p-8 h-full flex flex-col bg-white/90 backdrop-blur-sm'>
                            
                            {/* Icon with 3D effect */}
                            <div className='relative mb-6'>
                                <div 
                                    className='w-16 h-16 rounded-2xl flex justify-center items-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg'
                                    style={{background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`}}
                                >
                                    <tool.Icon className='w-8 h-8 text-white' />
                                </div>
                                
                                {/* Icon shadow */}
                                <div 
                                    className='absolute top-2 left-2 w-16 h-16 rounded-2xl opacity-30 transform translate-z-[-4px]'
                                    style={{background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`}}
                                ></div>
                            </div>
                            
                            {/* Text Content */}
                            <div className='flex-1'>
                                <h3 className='text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors'>
                                    {tool.title}
                                </h3>
                                <p className='text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors'>
                                    {tool.description}
                                </p>
                            </div>
                            
                            {/* Bottom accent */}
                            <div className='mt-4 flex justify-between items-center'>
                                <div 
                                    className='h-1 w-16 rounded-full transform group-hover:w-24 transition-all duration-300'
                                    style={{background: `linear-gradient(to right, ${tool.bg.from}, ${tool.bg.to})`}}
                                ></div>
                                <div className='text-xs text-gray-400 group-hover:text-gray-600 transition-colors'>
                                    Click to explore
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* 3D Back/Depth Layer */}
                    <div 
                        className='absolute inset-0 rounded-xl transform translate-z-[-12px] translate-x-3 translate-y-3 opacity-20'
                        style={{background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`}}
                    ></div>
                    
                    {/* Additional depth layer */}
                    <div 
                        className='absolute inset-0 rounded-xl transform translate-z-[-20px] translate-x-5 translate-y-5 opacity-10'
                        style={{background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`}}
                    ></div>
                </div>
            </div>
        ))}
    </div>
</div>

  )
}

export default AITools