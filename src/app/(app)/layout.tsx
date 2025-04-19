"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
    LogOutIcon,
    MenuIcon,
    LayoutDashboardIcon,
    Share2Icon,
    UploadIcon,
    ImageIcon,
    ChevronRightIcon,
} from "lucide-react";

const sidebarItems = [
    { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
    { href: "/social-share", icon: Share2Icon, label: "Social Share" },
    { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { signOut } = useClerk();
    const { user } = useUser();

    const handleLogoClick = () => {
        router.push("/");
    };

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            {/* Navbar */}
            <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-sm">
                <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white lg:hidden"
                        >
                            <MenuIcon className="w-6 h-6" />
                        </button>
                        <div
                            className="ml-2 lg:ml-0 flex items-center space-x-2 cursor-pointer"
                            onClick={handleLogoClick}
                        >
                            <div className="bg-indigo-500 p-1.5 m-2 rounded-md">
                                <ImageIcon className="w-7 h-7  text-white" />
                            </div>
                            <span className="font-bold text-2xl text-gray-900 dark:text-white">PixelSaaS</span>
                        </div>
                    </div>

                    {user && (
                        <div className="flex items-center space-x-4">
                            <div className="hidden sm:block">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {user.username || user.emailAddresses[0].emailAddress}
                                </span>
                            </div>
                            <div className="relative">
                                <img
                                    src={user.imageUrl}
                                    alt="User"
                                    className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-gray-700"
                                />
                                <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-1 ring-white dark:ring-gray-800"></span>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                aria-label="Sign out"
                            >
                                <LogOutIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar backdrop */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                {/* Sidebar */}
                <aside
                    className={`fixed lg:static inset-y-0 left-0 z-20 w-64 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                        } transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto`}
                >
                    <nav className="mt-2 px-3">
                        <div className="space-y-1">
                            {sidebarItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                                                ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                                            }`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            }`} />
                                        <span className="flex-1">{item.label}</span>
                                        {isActive && (
                                            <ChevronRightIcon className="ml-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>

                    {user && (
                        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 p-4">
                            <div className="flex items-center space-x-3 mb-3">
                                <img
                                    src={user.imageUrl}
                                    alt="User avatar"
                                    className="h-10 w-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {user.username || "User"}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {user.emailAddresses[0].emailAddress}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            >
                                <LogOutIcon className="mr-2 h-4 w-4" />
                                Sign Out
                            </button>
                        </div>
                    )}
                </aside>

                {/* Main content */}
                <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}   