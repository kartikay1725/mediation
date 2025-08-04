'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import DeleteCaseBox from "@/components/DeleteCaseBox"; 
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSunc = async () => {
    try {
      const res = await fetch('/api/daily-reminder', { method: 'GET' });
      const data = await res.json();
      toast.success('Email sent and the Total cases are ' + data.count);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDownload = async () => {
    const response = await fetch('/api/download');
    if (!response.ok) {
      return alert('Failed to download file');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mediation_cases.xlsx';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <nav className="bg-white shadow-sm p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-4">
          <Image
            src="/icons/icon.svg"
            alt="Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <h1 className="text-3xl font-bold text-primary">Mediation</h1>
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/admin/mediation/search">
            <Button variant="ghost" className="bg-neutral-100 text-black px-4 py-2 rounded-xl text-sm hover:bg-gray-900 hover:text-white">
              Search Case
            </Button>
          </Link>
          <Link href="/admin/mediation/add">
            <Button variant="ghost" className="bg-neutral-100 text-black px-4 py-2 rounded-xl text-sm hover:bg-gray-900 hover:text-white">
              Add Mediation
            </Button>
          </Link>
          <Link href="/admin/register">
            <Button variant="ghost" className="bg-neutral-100 text-black px-4 py-2 rounded-xl text-sm hover:bg-gray-900 hover:text-white">
              Register Mediator
            </Button>
          </Link>
          <Button variant="ghost" onClick={handleSunc} className="bg-neutral-100 text-black px-4 py-2 rounded-xl text-sm hover:bg-gray-900 hover:text-white">
            Sync
          </Button>
          <Button variant="ghost" onClick={handleDownload} className="bg-neutral-100 text-black px-4 py-2 rounded-xl text-sm hover:bg-gray-900 hover:text-white">
            Download the sheet
          </Button>
          <DeleteCaseBox />
        </div>
      </div>

      {/* Mobile menu items */}
      {isOpen && (
        <div className="mt-4 flex flex-col space-y-2 md:hidden">
          <Link href="/admin/mediation/search">
            <Button variant="ghost" className="w-full text-left">
              Search Case
            </Button>
          </Link>
          <Link href="/admin/mediation/add">
            <Button variant="ghost" className="w-full text-left">
              Add Mediation
            </Button>
          </Link>
          <Link href="/admin/register">
            <Button variant="ghost" className="w-full text-left">
              Register Mediator
            </Button>
          </Link>
          <Button variant="ghost" onClick={handleSunc} className="w-full text-left">
            Sync
          </Button>
          <Button variant="ghost" onClick={handleDownload} className="w-full text-left">
            Download the sheet
          </Button>
          <DeleteCaseBox />
        </div>
      )}
    </nav>
  );
}
