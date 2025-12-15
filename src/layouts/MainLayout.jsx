import { Outlet } from 'react-router'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import BackgroundGlow from '../components/Shared/BackgroundGlow'
const MainLayout = () => {
  return (
    <div className='relative overflow-hidden'>
      <BackgroundGlow />
      <Navbar />
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
