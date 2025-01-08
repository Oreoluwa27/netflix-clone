"use client";
import Input from "@/components/Input";
import { useCallback, useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [variant, setVariant] = useState<"login" | "signup">("login");

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "signup" : "login"));
  }, []);

  return (
    <div className="relative w-full h-full  bg-[url('/image/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover ">
      <div className="md:bg-black/50 h-full w-full bg-black">
        <nav className="px-12 py-5">
          <img src="/image/logo.png" alt="Netflix Logo" className="h-10 " />
        </nav>
        <div className="flex justify-center">
          <div className="md:bg-black/70  px-16 py-16 self-center mt-2 md:w-2/5 md:max-w-md rounded-md w-full">
            <h1 className="text-white text-4xl mb-8 font-semibold">Sign in</h1>
            <div className="flex flex-col gap-4">
              <Input
                label="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                id="username"
                type="text"
                value={username}
              />
              <Input
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button className="bg-red-600 text-white rounded-md py-2 mt-10 hover:bg-red-700 transition w-full">
              Login
            </button>

            <p className="text-neutral-500 mt-12">
              First time using Netflix?
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                Create an account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
