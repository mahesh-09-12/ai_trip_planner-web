import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import SignInDialog from "../ui/SignInDialog";
import axios from "axios";
import DarkModeToggle from "../ui/DarkModeToggle";
import { useTheme } from "./ThemeProvider";

const Header = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const { theme } = useTheme();

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleOpen = () => setOpen(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenRes) => {
      if (!tokenRes.access_token) {
        toast.error("Authentication failed. Please try again.");
        return;
      }
      await getUserDetails(tokenRes.access_token);
    },

    onError: (err) => {
      console.error("Google Login Error: ", err);
      toast.error("Google sign-in failed. Please try again.");
    },
  });

  const getUserDetails = async (accessToken) => {
    if (!accessToken) {
      console.error("No access token received!");
      toast.error("Authentication failed. Please try again.");
      return;
    }
    try {
      const { data } = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(data));
      setDialogOpen(false);
    } catch (error) {
      console.error("Error fetching user info:", error);
      toast.error("Failed to retrieve user details. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-between p-3">
      <Link to="/">
        <div className="flex font-extrabold text-xl sm:text-2xl md:text-3xl gap-3 items-center justify-center cursor-pointer">
          <img
            src="/logo.svg"
            alt="logo"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
          <span>Trip Planner</span>
        </div>
      </Link>
      <div className="flex items-center gap-1 md:gap-3">
        <DarkModeToggle />
        {user ? (
          <>
            <Link to="/create-trip">
              <Button
                variant={`${theme === "light" ? "outline" : "default"}`}
                className="rounded-full cursor-pointer hidden sm:block"
              >
                + Create Trip
              </Button>
            </Link>
            <Link to="/my-trips">
              <Button
                variant={`${theme === "light" ? "outline" : "default"}`}
                className="rounded-full cursor-pointer hidden sm:block"
              >
                My Trips
              </Button>
            </Link>
            <DropdownMenu.Root open={open} onOpenChange={setOpen}>
              <DropdownMenu.Trigger asChild>
                <button className="outline-none focus:ring-1 focus:ring-blue-300 rounded-full">
                  <img
                    src={user?.picture}
                    alt="Profile"
                    className="w-12 h-12 rounded-full cursor-pointer object-cover p-0.5"
                    referrerPolicy="no-referrer"
                  />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className={`min-w-[9rem] shadow-lg rounded-md p-2 border ${
                    theme === "light"
                      ? "bg-white border-gray-200 text-black"
                      : "bg-black border-gray-700 text-gray-400"
                  }`}
                  side="bottom"
                  align="start"
                  sideOffset={5}
                >
                  <DropdownMenu.Item
                    asChild
                    onSelect={handleOpen}
                    className={`p-2 cursor-pointer rounded-md block ${
                      theme === "light"
                        ? "hover:bg-gray-100"
                        : "hover:bg-gray-600"
                    }`}
                  >
                    <Link to="/">Home</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator
                    className={`h-px my-1 ${
                      theme === "light" ? "bg-gray-200" : "bg-gray-500"
                    }`}
                  />
                  <DropdownMenu.Item
                    asChild
                    onSelect={handleOpen}
                    className={`p-2 cursor-pointer rounded-md block ${
                      theme === "light"
                        ? "hover:bg-gray-100"
                        : "hover:bg-gray-600"
                    }`}
                  >
                    <Link to="/profile">Profile</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator
                    className={`h-px my-1 ${
                      theme === "light" ? "bg-gray-200" : "bg-gray-500"
                    }`}
                  />
                  <DropdownMenu.Item
                    asChild
                    onSelect={handleOpen}
                    className={`p-2 cursor-pointer rounded-md block ${
                      theme === "light"
                        ? "hover:bg-gray-100"
                        : "hover:bg-gray-600"
                    }`}
                  >
                    <Link to="/create-trip">Create Trip</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator
                    className={`h-px my-1 ${
                      theme === "light" ? "bg-gray-200" : "bg-gray-500"
                    }`}
                  />
                  <DropdownMenu.Item
                    asChild
                    onSelect={handleOpen}
                    className={`p-2 cursor-pointer rounded-md block ${
                      theme === "light"
                        ? "hover:bg-gray-100"
                        : "hover:bg-gray-600"
                    }`}
                  >
                    <Link to="/my-trips">My Trips</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator
                    className={`h-px my-1 ${
                      theme === "light" ? "bg-gray-200" : "bg-gray-500"
                    }`}
                  />
                  <DropdownMenu.Item
                    className={`p-2 cursor-pointer rounded-md ${
                      theme === "light"
                        ? "text-red-500 hover:bg-gray-100"
                        : "text-red-400 hover:bg-gray-600"
                    }`}
                    onSelect={handleLogout}
                  >
                    Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </>
        ) : (
          <>
            <Button
              onClick={() => setDialogOpen(true)}
              className="cursor-pointer p-2 py-2 sm:p-5"
            >
              Sign in
            </Button>
            <SignInDialog
              login={login}
              dialogOpen={dialogOpen}
              setDialogOpen={setDialogOpen}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
