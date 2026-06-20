'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import Link from 'next/link';
import { Layers } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ name, email, password });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96 animate-fade-in-up">
          <div className="flex items-center text-indigo-600 mb-8">
            <Layers size={32} className="mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">TaskFlow</h2>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Start managing your tasks effectively today.
          </p>

          <div className="mt-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <Input
                label="Full Name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
              <Input
                label="Email address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
              <Input
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
              />

              <div className="pt-3">
                <Button type="submit" className="w-full" isLoading={loading}>
                  Sign up
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center text-sm">
              <span className="text-gray-500">Already have an account? </span>
              <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Abstract Gradient/Image */}
      <div className="hidden lg:block relative w-0 flex-1 bg-indigo-50">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-indigo-900 via-indigo-600 to-purple-500 opacity-95 overflow-hidden">
          {/* Abstract circles */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-white opacity-10 blur-3xl mix-blend-overlay"></div>
          <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] rounded-full bg-purple-300 opacity-20 blur-3xl mix-blend-overlay"></div>
          
          <div className="absolute inset-0 flex items-center justify-center p-24 text-white text-center">
             <div>
                <h3 className="text-4xl font-bold mb-4">Elevate Your Productivity</h3>
                <p className="text-lg text-indigo-100 max-w-lg mx-auto">
                  Join thousands of professionals organizing their life and work with TaskFlow.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
