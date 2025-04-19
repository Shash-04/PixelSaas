"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X, Play, CheckCircle } from "lucide-react";


export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    <path d="M14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">PixelSaaS</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              {/* <Link href="/features" className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition">
                Features
              </Link>
              <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition">
                Pricing
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition">
                About
              </Link> */}
              <div className="h-5 w-px bg-gray-300 dark:bg-gray-700"></div>
              <Link href="/signin" className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          className="md:hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMenuOpen && (
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 shadow-lg">
              {/* <Link
                href="/features"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link> */}
              <Link
                href="/signin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="block w-full px-3 py-2 rounded-md text-base font-medium text-center text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 lg:pt-36 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:space-x-12">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Transform Your <span className="text-indigo-600 dark:text-indigo-400">Digital Content</span> Experience
                </h1>
                <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                  PixelSaaS helps you manage, edit, and share your digital content seamlessly across all platforms. Elevate your media workflow today.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                <div className="mt-6 flex items-center">
                  {/* <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 bg-gray-200 dark:bg-gray-700"></div>
                    ))}
                  </div> */}
                  <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                    Join <span className="font-medium text-gray-900 dark:text-white">5,000+</span> content creators
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg transform -rotate-3 scale-100 opacity-10 blur-xl"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="px-4 py-1 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="p-4 md:p-6 lg:p-8">
                    {/* <img src="Logo.png" alt="No image found" /> */}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Everything you need to manage your digital content
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform provides powerful tools designed to streamline your workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Video Editing",
                description: "Edit your videos with our intuitive drag-and-drop interface.",
                icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
              },
              {
                title: "Image Enhancement",
                description: "Enhance your images with AI-powered tools.",
                icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
              },
              {
                title: "Cloud Storage",
                description: "Store and access your content from anywhere, anytime.",
                icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
              >
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon}></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 dark:bg-indigo-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
              <div className="lg:flex lg:items-center lg:justify-between">
                <div className="lg:w-7/12">
                  <h2 className="text-3xl font-bold text-white">
                    Ready to transform your digital content workflow?
                  </h2>
                  <p className="mt-4 text-lg text-indigo-100">
                    Join thousands of creators who trust PixelSaaS for their media management needs.
                  </p>
                  <div className="mt-6 space-y-3">
                    {["No credit card required", "14-day free trial", "Cancel anytime"].map((item, i) => (
                      <div key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                        <span className="text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 lg:mt-0 lg:w-4/12">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md"
                  >
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                      Start your free trial today
                    </h3>
                    <Link
                      href="/signup"
                      className="mt-6 block w-full bg-indigo-600 dark:bg-indigo-500 py-3 px-4 rounded-md text-white font-medium text-center hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
                    >
                      Sign Up Now
                    </Link>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                      No credit card required
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    <path d="M14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">PixelSaaS</span>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                The complete platform for digital content creators and managers.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Product
              </h3>
              <ul className="mt-4 space-y-2">
                {["Features", "Pricing", "Integrations", "FAQ"].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                {["About", "Blog", "Careers", "Contact"].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Legal
              </h3>
              <ul className="mt-4 space-y-2">
                {["Privacy", "Terms", "Security", "Cookies"].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-center dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} PixelSaaS. All rights reserved.
            </p>
            {/* <div className="mt-4 md:mt-0 flex space-x-4">
              {["twitter", "facebook", "instagram", "github"].map((social, i) => (
                <Link
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </Link>
              ))}
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
}