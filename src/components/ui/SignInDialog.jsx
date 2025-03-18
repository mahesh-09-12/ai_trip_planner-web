import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "./button";
import { FcGoogle } from "react-icons/fc";
import { useTheme } from "../custom/ThemeProvider";

const SignInDialog = ({ login, dialogOpen, setDialogOpen }) => {
  const { theme } = useTheme();
  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen} modal={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          className={`flex flex-col gap-3 fixed top-1/2 left-1/2 w-[90%] max-w-md p-12 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 ${
            theme == "dark"
              ? "bg-slate-800 text-gray-400"
              : "bg-white text-black"
          }`}
        >
          <div className="flex font-extrabold text-xl sm:text-2xl gap-3 items-center my-1">
            <img
              src="/logo.svg"
              alt="logo"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            />
            <span>Trip Planner</span>
          </div>
          <Dialog.Title className="text-lg font-bold">
            Sign in to Your Account
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 mt-2">
            Continue with your Google account to access your trips.
          </Dialog.Description>

          <Button
            onClick={() => login()}
            className="mt-4 w-full flex items-center justify-center gap-2 p-3 rounded-lg cursor-pointer"
          >
            <FcGoogle style={{ width: "1.7rem", height: "1.7rem" }} />
            Continue with Google
          </Button>

          <Dialog.Close asChild>
            <button
              aria-label="Close"
              className="absolute cursor-pointer top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SignInDialog;
