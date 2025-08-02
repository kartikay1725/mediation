'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Boxes } from '@/components/ui/background-boxes';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'admin' | 'mediator'>('mediator');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          role,
          method: 'password',
          remember: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      toast.success('Login successful!');
      
      if (data.role === 'admin') {
        router.push(`/admin/mediation/search`);
      } else {
        router.push(`/mediator/dashboard?userId=${data.userId}`);
      }
    } 
    //eslint-disable-next-line
    catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center px-4">
      {/* Background Boxes - positioned absolutely behind content */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Boxes />
      </div>
      
      {/* Login Card - positioned above the background */}
      <div className="w-full max-w-md p-8 border border-border rounded-xl shadow-xl bg-card/90 backdrop-blur-sm space-y-6 relative z-10">
        <h1 className="text-3xl font-bold text-center text-foreground">Login to Mediation</h1>

        <div className="flex justify-center space-x-4">
          <Button type="button" variant={role === 'admin' ? 'default' : 'outline'} onClick={() => setRole('admin')}>
            Admin
          </Button>
          <Button type="button" variant={role === 'mediator' ? 'default' : 'outline'} onClick={() => setRole('mediator')}>
            Mediator
          </Button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              placeholder='Enter your email' 
              type="email" 
              required 
              onChange={handleChange} 
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password" 
              placeholder='Enter your password' 
              type="password" 
              required 
              onChange={handleChange} 
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : `Login as ${role}`}
          </Button>
        </form>
      </div>
    </div>
  );
}