
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, LogIn } from 'lucide-react';

const ADMIN_EMAIL = "admin@gmail.com"; // Actual admin email remains the same
const ADMIN_PASSWORD = "admin"; // Actual admin password remains the same
const AUTH_KEY = "isAdminLoggedIn"; // Key for localStorage

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Check if admin is already logged in on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem(AUTH_KEY) === 'true';
    if (isLoggedIn) {
      router.replace('/admin/dashboard'); // Use replace to avoid adding login to history
    }
  }, [router]);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate login check
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem(AUTH_KEY, 'true'); // **INSECURE:** Store login state
        toast({
          title: "Login Successful",
          description: "Redirecting to admin dashboard...",
          variant: "default",
        });
        router.push('/admin/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }, 500); // Simulate network delay
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-900">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="xyz@gmail.com" // Updated placeholder
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
               <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="xyz" // Updated placeholder
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                  disabled={isLoading}
                />
               </div>
            </div>
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
              {isLoading ? 'Logging in...' : (
                <>
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </>
              )}
            </Button>
          </form>
        </CardContent>
         {/* Removed CardFooter content */}
         <CardFooter className="pt-4">
            {/* Footer can be empty or contain other elements if needed later */}
         </CardFooter>
      </Card>
       {/* Removed insecure login warning paragraph */}
    </main>
  );
}
