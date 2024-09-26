import React, { useEffect } from 'react'
import { Button } from '../button'
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


function Header() {
  const user = localStorage.getItem('user');
  
  useEffect(() => {
    console.log(user)
  }, []);

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src='/logo.svg' />
      <div>
        {
          user ?
          <div className='flex items-center gap-3'>
          <Popover>
            <PopoverTrigger> 
            <img src={user?.picture} className='h-[30px] w-[30px] rounded-full'/>
            </PopoverTrigger>
            <PopoverContent>
              <h2 onClick={() => {
                googleLogout();
                localStorage.clear();
                window.location.reload();
                navigation('/');
              }}>Logout</h2>
            </PopoverContent>
          </Popover>
          </div>
          :
           <Button >Log Out</Button>
        }
      </div>
    </div>
  )
}

export default Header