import { Outlet } from 'react-router'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'

import BackgroundGlow from '../components/Shared/BackgroundGlow'

const DashboardLayout = () => {
  return (
    <div className='relative min-h-screen md:flex overflow-hidden bg-gray-50'>
      <BackgroundGlow />
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1  md:ml-64 relative z-10'>
        <div className='p-5'>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
