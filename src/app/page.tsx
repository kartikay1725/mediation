"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import  MediatorsListDemo  from "@/components/mediators-list-demo";
import {LampContainer} from "@/components/ui/lamp";
import { FacultyMentor } from "@/components/Mentor";
import { LinkPreview } from "@/components/ui/link-preview";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
       
      <section className="flex items-center justify-center min-h-screen text-center bg-gradient-to-b from-gray-900 to-gray-950">
  <LampContainer>
    <motion.div
      initial={{ opacity: 0.5, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="flex flex-col items-center justify-center"
    >
      <h1 className="text-6xl font-bold tracking-wide bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent md:text-7xl">
        Mediation Portal
      </h1>
      <p className="mt-4 text-xl font-light text-gray-300">
        Resolve Disputes with Peace and Trust
      </p>
      <Button asChild className="mt-10 text-lg px-6 py-3">
        <Link href="/login">Begin Your Resolution Journey</Link>
      </Button>
    </motion.div>
  </LampContainer>
</section>

      

      {/* Leader Section */}
      <section className="text-center bg-gray-800 ">
        <FacultyMentor/>
      </section>

      {/* Team Members Section */}
      <section className="bg-gray-800 py-16">
        <h3 className="text-3xl text-center font-semibold text-white mb-10">
          Our Trained Mediators
        </h3>
        <div className="max-w-6xl mx-auto">
          <MediatorsListDemo />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-300 py-12 px-4 mt-auto">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xl font-semibold mb-2 text-white">Mediation Office</h4>
            <p>Address: court complex ambala city Haryana</p>
            <p>Phone: +91 9876543210</p>
            <p>Email: mediationoffice@delhicourt.gov.in</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2 text-white">Site Creator</h4>
            <p>Name: Kartikay Achint</p>
            <p>Email:  kdachint12@gmail.com </p>
            LinkedIn: <LinkPreview url="https://www.linkedin.com/in/kartikay-achint-27a416332/" className="text-whitw">linkedin.com/kartikay-achint</LinkPreview> <br />
            Github: <LinkPreview url="https://github.com/kartikay1725" className="text-white"> github.com/kartikay1725 </LinkPreview>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-6 text-sm">
          © {new Date().getFullYear()} Mediation Portal. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
