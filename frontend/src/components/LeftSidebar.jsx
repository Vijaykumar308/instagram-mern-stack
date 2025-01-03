import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import axios from 'axios';
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';



const sidebarItems = [
  {icon: <Home />, text:"Home" },
  {icon: <Search />, text:"Search" },
  {icon: <TrendingUp />, text:"Explore" },
  {icon: <MessageCircle />, text:"Message" },
  {icon: <Heart />, text:"Notification" },
  {icon: ( 
          <Avatar className='w-7 h-6'>
            <AvatarImage className='rounded-[50%]' src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
         ), 
        text:"Profile"
 },
  {icon: <LogOut />, text:"Logout" },
]

function LeftSidebar() {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/user/logout`, {withCredentials:true});
      console.log(res);
      if(res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const sidebarHandler = (textType) => {
    if(textType === "Logout") logoutHandler();

  }


  return (
    <div className='fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen'>
      <div className='flex flex-col'> 
        <h1 className='my-8 pl-3 font-bold text-xl'> LOGO </h1>
      {
        sidebarItems.map((item, index) => {
          return (
            <div key={index} onClick={() => sidebarHandler(item.text)} className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
              {item.icon}
              <span>{item.text}</span>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default LeftSidebar;