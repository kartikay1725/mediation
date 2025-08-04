import React, { Suspense } from 'react';
import MediatorDashboard from "@/components/MediatorDashboard";
import { LoaderOne } from '@/components/ui/loader';
import { Navbar } from '@/components/NavbarClient';

export default function Dashboardpage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-40"><LoaderOne /></div>}>
      <Navbar />
      <MediatorDashboard />
    </Suspense>
  );
}
