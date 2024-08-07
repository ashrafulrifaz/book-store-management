import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import Router from './Router/Router';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
      <Toaster position="top-center" 
        toastOptions={{
          unstyled: true,
          classNames: {
            error: 'bg-red-400 bg-red-100 rounded-xl border border-red-400 py-3 px-4 flex gap-2 items-center',
            success: 'text-green-500 bg-green-100 rounded-xl border border-green-500 py-3 px-4 flex gap-2 items-center',
            warning: 'text-yellow-400 bg-yellow-100 rounded-xl border border-yellow-400 py-3 px-4 flex gap-2 items-center',
            info: 'bg-blue-400 bg-blue-100 rounded-xl border border-blue-400 py-3 px-4 flex gap-2 items-center',
          },
        }} />
    </QueryClientProvider>
  </React.StrictMode>,
)
