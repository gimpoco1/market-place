'use client';
import { VercelToolbar } from '@vercel/toolbar/next';
import  useIsEmployee  from '@/libs/prismadb'; // Your auth library
 
export function StaffToolbar() {
  const isEmployee = useIsEmployee();
  return isEmployee ? <VercelToolbar /> : null;
}