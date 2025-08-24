import React, { useEffect, useState } from "react";
import { Button } from "../ui/button.jsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout,useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Link } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const getUserProfile = (tokeninfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokeninfo?.access_token}`,
            Accept: `Application/json`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="bg-black/50 backdrop-blur-md relative top-0 left-0 w-full z-50 p-2 shadow-sm flex justify-between items-center px-3">
      <div className="flex flex-row gap-2">
        <img src="/logo.svg"></img>
        <h1 className="text-amber-300 font-bold text-2xl">DestinAI</h1>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href = '/create-trip'>
              <Button className="cursor-pointer rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg">
              + Create Trip
              </Button>
            </a>
            <a href = '/my-trips'>
              <Button className="cursor-pointer rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg">
              My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture || "/OIP.jpeg"}
                  className="cursor-pointer h-[35px] w-[35px] rounded-full"
                ></img>
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button className = "cursor-pointer bg-orange-500 hover:bg-orange-600" onClick = {() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <img src="logo.svg" />
                  <h2 className="font-bold text-lg mt-5 mb-2 text-black">
                    Sign In with Google
                  </h2>
                  <p>Sign in with google authentication securely.</p>

                  <Button
                    onClick={login}
                    className="w-full mt-5 flex items-center h-10"
                  >
                    <FcGoogle className="h-9 w-13" />
                    Sign In
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
    </div>
  );
};

export default Header;
