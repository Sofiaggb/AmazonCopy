/* eslint-disable react/no-unescaped-entities */
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react';
import SideNavContent from './SideNavContent';
import { useSelector } from 'react-redux';


const HeaderBottom = () => {
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const ref = useRef();
  const [sideBar, setSideBar] = useState(false);
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        setSideBar(false)
      }
    })
  }, [ref, sideBar])
  return (
    <div className="w-full px-4 h-[36px] bg-amazon_light text-white flex items-center">
      {/* List Items */}
      <ul className="flex items-center gap-2 text-sm tracking-wide">
        <li onClick={() => setSideBar(true)} className="headerHover flex items-center gap-1"><MenuIcon /> All </li>
        <li className="headerHover hidden mdl:inline-flex"> Today's Deals </li>
        <li className="headerHover hidden mdl:inline-flex"> Customer Service </li>
        <li className="headerHover hidden mdl:inline-flex"> Gift Cards </li>
        <li className="headerHover hidden mdl:inline-flex"> Registry </li>
        <li className="headerHover hidden mdl:inline-flex"> Sell </li>
      </ul>

      {/* SideNav */}
      {sideBar && (
        <div className='w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50'>
          <div className='h-full w-full relative'>
            <motion.div ref={ref} initial={{ x: -500, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: .5 }}
              className='w-[80%] md:w-[350px] h-full bg-white border border-black'>
              <div className='w-full bg-amazon_light text-white py-2 px-6 flex items-center gap-4'>
                <AccountCircleIcon />
                {
                  userInfo ? (
                    <h3 className=' font-titleFont font-bold text-lg tracking-wide'>
                      {userInfo.userName}
                    </h3>

                  ) : (
                    <h3 className=' font-titleFont font-bold text-lg tracking-wide'>
                      Hello, Sing In
                    </h3>

                  )
                }
              </div>
              <div className='h-[550px] overflow-y-scroll overflow-x-hidden'>
                <SideNavContent
                  title="Digital Content & Devices"
                  one="Amazon Music"
                  two="Kindle E-readers & Books"
                  three="Amazon Appstore"
                />
                <SideNavContent
                  title="Shop by Department"
                  one="Electronics"
                  two="Computers"
                  three="Smart Home"
                />
                <SideNavContent
                  title="Programs & Features"
                  one="Gift Cards"
                  two="Shop By Interest"
                  three="Amazon Live"
                />
                <SideNavContent
                  title="Help & Settings"
                  one="Your Account"
                  two="Customer Service"
                  three="Contact Us"
                />
              </div>
              <span onClick={() => setSideBar(false)}
                className='cursor-pointer absolute top-0 left-[82%] md:left-[360px] w-10 h-10 text-black flex items-center
                   justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-300'>
                <CloseIcon />
              </span>
            </motion.div>

          </div>
        </div>
      )}

    </div>
  )
}

export default HeaderBottom
