import React, { Suspense } from 'react';
import MediatorDashboard from "@/components/MediatorDashboard";
import { LoaderOne } from '@/components/ui/loader';

export default function Dashboardpage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-40"><LoaderOne /></div>}>
      <MediatorDashboard />
    </Suspense>
  );
}
