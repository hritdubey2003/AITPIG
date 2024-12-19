import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from '../button';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { redirect, useNavigate } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { FcGoogle } from 'react-icons/fc';

function Header() {
  // const navigate = useNavigate(); // Use navigate from react-router
  const [OpenDialogue, setOpenDialogue] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      GetUserProfile(codeResp);
    },
    onError: (error) => console.error('Login failed', error),
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: 'application/json',
          },
        }
      );
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      setOpenDialogue(false);
      redirect('/create-trip'); // Redirect after successful login
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('user');
    setUser(null);
    redirect('/');
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" alt="Logo" />
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <Popover>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialogue(true)}>Log In</Button>
        )}
      </div>
      <Dialog open={OpenDialogue} onOpenChange={setOpenDialogue}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-7">Sign in with Google!</h2>
              <p>Sign in to the app with Google Authentication Security!</p>
              <Button
                onClick={login}
                variant="outline"
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" /> Sign In With Google!
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
