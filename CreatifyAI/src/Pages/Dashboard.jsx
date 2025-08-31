import React, { useEffect, useState } from 'react'
import { Gem, Sparkles } from 'lucide-react';
import { Protect, useAuth, useUser } from '@clerk/clerk-react';
import CreationItem from '../Components/CreationItem';
import toast from 'react-hot-toast';
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

// Skeleton Components
const StatCardSkeleton = () => (
  <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
    <div className='text-slate-600 flex-1'>
      <div className='h-4 bg-gray-200 rounded animate-pulse mb-2 w-24'></div>
      <div className='h-6 bg-gray-200 rounded animate-pulse w-16'></div>
    </div>
    <div className='w-10 h-10 rounded-lg bg-gray-200 animate-pulse'></div>
  </div>
);

const CreationItemSkeleton = () => (
  <div className='p-4 bg-white rounded-lg border border-gray-200'>
    <div className='animate-pulse'>
      <div className='flex items-center gap-3 mb-3'>
        <div className='w-8 h-8 bg-gray-200 rounded'></div>
        <div className='h-5 bg-gray-200 rounded w-32'></div>
        <div className='ml-auto h-4 bg-gray-200 rounded w-20'></div>
      </div>
      <div className='space-y-2 mb-4'>
        <div className='h-4 bg-gray-200 rounded w-full'></div>
        <div className='h-4 bg-gray-200 rounded w-3/4'></div>
        <div className='h-4 bg-gray-200 rounded w-1/2'></div>
      </div>
      <div className='flex justify-between items-center'>
        <div className='h-4 bg-gray-200 rounded w-24'></div>
        <div className='flex gap-2'>
          <div className='h-8 bg-gray-200 rounded w-16'></div>
          <div className='h-8 bg-gray-200 rounded w-16'></div>
        </div>
      </div>
    </div>
  </div>
);

const RecentCreationsSkeleton = () => (
  <div className='space-y-3'>
    <div className='flex justify-between items-center mb-4'>
      <div className='h-6 bg-gray-200 rounded animate-pulse w-40'></div>
      <div className='h-4 bg-gray-200 rounded animate-pulse w-20'></div>
    </div>
    {[...Array(4)].map((_, index) => (
      <CreationItemSkeleton key={index} />
    ))}
  </div>
);

function Dashboard() {
  const [creations, setCreations] = useState([]);
  const [userPlan, setUserPlan] = useState('free');
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  const { user } = useUser();

  const getDashboard = async() => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      
      if (data.success) {
        setCreations(data.creations);
        setUserPlan(data.plan || 'free');
        console.log(data);
      } else {
        toast.error(data.error || 'Failed to load dashboard');
      }
      
    } catch (error) {
      console.error('Dashboard error:', error);
      toast.error(error.response?.data?.error || error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    getDashboard();
  }, []);

  // Get plan with fallback
  const displayPlan = userPlan || 
                     user?.publicMetadata?.plan || 
                     user?.privateMetadata?.plan || 
                     'free';

  const planDisplayName = displayPlan === 'premium' ? 'Premium' : 'Free';
  const isUnlimited = displayPlan === 'premium';

  return (
    <div className='h-full overflow-y-scroll p-6'>
      {/* Stats Cards Section */}
      <div className='flex justify-start gap-4 flex-wrap mb-8'>
        
{loading ? (
  <>
    <StatCardSkeleton />
    <StatCardSkeleton />
    <StatCardSkeleton />
  </>
) : (
  <React.Fragment>
    {/* 3D Dashboard Cards */}
    {/* Total Creations Card */}
    <div className='group w-72 h-32 perspective-1000'>
      <div className='relative w-full h-full transform-style-preserve-3d transition-transform duration-500 hover:rotate-y-12 hover:rotate-x-6'>
        {/* Main Card */}
        <div className='absolute inset-0 bg-white rounded-xl border border-gray-200 shadow-lg transform translate-z-0 hover:shadow-xl transition-all duration-300'>
          <div className='flex justify-between items-center h-full p-4 px-6'>
            <div className='text-slate-600'>
              <p className='text-sm'>Total Creations</p>
              <h2 className='text-xl font-semibold'>{creations.length}</h2>
            </div>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center transform group-hover:scale-110 transition-transform duration-300'>
              <Sparkles className='w-5' />
            </div>
          </div>
        </div>
        
        {/* 3D Shadow/Depth Layer */}
        <div className='absolute inset-0 bg-gradient-to-br from-[#3588F2]/20 to-[#0BB0D7]/20 rounded-xl transform translate-z-[-8px] translate-x-2 translate-y-2 opacity-60'></div>
      </div>
    </div>

    {/* Active Plan Card */}
    <div className='group w-72 h-32 perspective-1000'>
      <div className='relative w-full h-full transform-style-preserve-3d transition-transform duration-500 hover:rotate-y-12 hover:rotate-x-6'>
        {/* Main Card */}
        <div className='absolute inset-0 bg-white rounded-xl border border-gray-200 shadow-lg transform translate-z-0 hover:shadow-xl transition-all duration-300'>
          <div className='flex justify-between items-center h-full p-4 px-6'>
            <div className='text-slate-600'>
              <p className='text-sm'>Active Plan</p>
              <h2 className='text-xl font-semibold'>
              <Protect plan='premium' fallback='Free'>Premium</Protect>
                
              </h2>
              {displayPlan === 'free' && (
                <p className='text-xs text-gray-400 mt-1 transform group-hover:text-orange-500 transition-colors'>
                  Limited features
                </p>
              )}
            </div>
            <div className={`w-10 h-10 rounded-lg ${
              displayPlan === 'premium' 
                ? 'bg-gradient-to-br from-[#F6AB41] to-[#FF4938]' 
                : 'bg-gradient-to-br from-[#3588F2] to-[#9E53EE]'
            } text-white flex justify-center items-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
              <Gem className='w-5' />
            </div>
          </div>
        </div>
        
        {/* 3D Shadow/Depth Layer */}
        <div className={`absolute inset-0 ${
          displayPlan === 'premium' 
            ? 'bg-gradient-to-br from-[#F6AB41]/20 to-[#FF4938]/20' 
            : 'bg-gradient-to-br from-[#3588F2]/20 to-[#9E53EE]/20'
        } rounded-xl transform translate-z-[-8px] translate-x-2 translate-y-2 opacity-60`}></div>
      </div>
    </div>

    {/* Usage Status Card */}
    <div className='group w-72 h-32 perspective-1000'>
      <div className='relative w-full h-full transform-style-preserve-3d transition-transform duration-500 hover:rotate-y-12 hover:rotate-x-6'>
        {/* Main Card */}
        <div className='absolute inset-0 bg-white rounded-xl border border-gray-200 shadow-lg transform translate-z-0 hover:shadow-xl transition-all duration-300'>
          <div className='flex justify-between items-center h-full p-4 px-6'>
            <div className='text-slate-600'>
              <p className='text-sm'>Usage Status</p>
              <h2 className='text-xl font-semibold'>
                {isUnlimited ? 'Unlimited' : 'Limited'}
              </h2>
              {!isUnlimited && (
                <p className='text-xs text-orange-500 mt-1 transform group-hover:text-red-500 transition-colors'>
                  Upgrade for more
                </p>
              )}
            </div>
            <div className={`w-10 h-10 rounded-lg ${
              isUnlimited 
                ? 'bg-gradient-to-br from-[#10B981] to-[#059669]' 
                : 'bg-gradient-to-br from-[#F59E0B] to-[#D97706]'
            } text-white flex justify-center items-center transform group-hover:scale-110 group-hover:rotate-[-12deg] transition-all duration-300`}>
              <Sparkles className='w-5' />
            </div>
          </div>
        </div>
        
        {/* 3D Shadow/Depth Layer */}
        <div className={`absolute inset-0 ${
          isUnlimited 
            ? 'bg-gradient-to-br from-[#10B981]/20 to-[#059669]/20' 
            : 'bg-gradient-to-br from-[#F59E0B]/20 to-[#D97706]/20'
        } rounded-xl transform translate-z-[-8px] translate-x-2 translate-y-2 opacity-60`}></div>
      </div>
    </div>
  </React.Fragment>
)}

      </div>

      {/* Recent Creations Section */}
      {loading ? (
        <RecentCreationsSkeleton />
      ) : (
        <div className='space-y-3'>
          <div className='flex justify-between items-center mb-4'>
            <p className='text-lg font-medium text-slate-700'>Recent Creations</p>
            <div className='text-sm text-gray-500'>
              {creations.length} {creations.length === 1 ? 'item' : 'items'}
            </div>
          </div>
          
          {creations.length === 0 ? (
            <div className='text-center py-16 bg-white rounded-lg border border-gray-200'>
              <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] flex items-center justify-center'>
                <Sparkles className='w-10 h-10 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>No creations yet</h3>
              <p className='text-gray-500 mb-6 max-w-sm mx-auto'>
                Start your creative journey! Generate articles, images, or get AI assistance with your projects.
              </p>
              <div className='flex gap-3 justify-center'>
                <button className='bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium'>
                  Create Article
                </button>
                <button className='bg-gradient-to-r from-[#3588F2] to-[#0BB0D7] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium'>
                  Generate Image
                </button>
              </div>
            </div>
          ) : (
            <div className='space-y-3'>
              {creations.map((item) => (
                <CreationItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}



export default Dashboard