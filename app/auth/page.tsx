"use client";
import Input from "@/components/Input";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [variant, setVariant] = useState<"login" | "signup">("login");

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "signup" : "login"));
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });

      router.push("/");
    } catch (err) {}
  }, [password, email]);

  const register = useCallback(async () => {
    const data = { email, password, name };
    try {
      await axios.post("/api/register", data);
      login();
    } catch (err) {
      console.log(err);
    }
  }, [email, password, name]);

  return (
    <div className="relative w-full h-full  bg-[url('/image/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover ">
      <div className="lg:bg-black/50 h-full w-full bg-black">
        <nav className="px-12 py-5">
          <img src="/image/logo.png" alt="Netflix Logo" className="h-10 " />
        </nav>
        <div className="flex justify-center">
          <div className="lg:bg-black/70  px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h1 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h1>
            <div className="flex flex-col gap-4">
              {variant === "signup" && (
                <Input
                  label="Username"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  id="username"
                  type="text"
                  value={name}
                />
              )}
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
            <button
              onClick={variant === "signup" ? register : login}
              className="bg-red-600 text-white rounded-md py-2 mt-10 hover:bg-red-700 transition w-full"
            >
              {variant === "login" ? "Sign in" : "Sign up"}
            </button>
            <div className="flex flex-row justify-center items-center gap-6 mt-4">
              <div
                className="w-10 h-10 bg-white flex items-center justify-center cursor-pointer transition hover:opacity-80 rounded-full"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <FcGoogle size={30} />
              </div>
              <div
                className="w-10 h-10 bg-white flex items-center justify-center cursor-pointer transition hover:opacity-80 rounded-full"
                onClick={() => signIn("github", { callbackUrl: "/" })}
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Sign in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
