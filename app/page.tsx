"use client";

import Image from "next/image";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Home() {
  const { isSignedIn } = useUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const res = await fetch("/api/test");
    const result = await res.json();
    setData(result);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    setTitle("");
    setDescription("");
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center py-20 px-16 bg-white dark:bg-black sm:items-start">

        {/* Logo */}
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        {/* Auth Section */}
        <div className="mt-10 flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">

          <h1 className="text-3xl font-semibold">
            {isSignedIn ? "Welcome Back!" : "Sign in to Continue"}
          </h1>

          <p className="max-w-md text-zinc-600 dark:text-zinc-400">
            {isSignedIn
              ? "You are logged in. Manage your profile or test your backend below."
              : "Please sign in to explore full functionality."}
          </p>

          <div className="flex items-center gap-4">

            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className="h-12 rounded-full bg-black px-8 text-sm font-medium text-white hover:bg-[#383838] dark:bg-white dark:text-black">
                  Sign In Now
                </button>
              </SignInButton>
            ) : (
              <>
                <Link
                  href="/user-profile"
                  className="h-12 flex items-center rounded-full border px-8 text-sm hover:bg-black/[.04]"
                >
                  View Profile
                </Link>

                <UserButton afterSignOutUrl="/" />
              </>
            )}

          </div>
        </div>

        {/* ---------------- DB TEST SECTION ---------------- */}
        <div className="mt-16 w-full max-w-md">

          <h2 className="text-xl font-semibold mb-6">
            MongoDB Test
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-3 rounded"
              required
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-3 rounded"
              required
            />

            <button
              type="submit"
              className="bg-black text-white py-3 rounded"
            >
              Submit
            </button>
          </form>

          {/* Render Data */}
          <div className="mt-10 space-y-4">
            {data.length === 0 && (
              <p className="text-sm text-gray-500">No records found.</p>
            )}

            {data.map((item, index) => (
              <div key={index} className="border p-4 rounded">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
