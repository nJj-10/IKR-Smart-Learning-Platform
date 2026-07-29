import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
export default function AppLayout(){const[open,setOpen]=useState(false);return <div className="flex min-h-screen"><Sidebar open={open} onClose={()=>setOpen(false)}/>{open&&<button className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={()=>setOpen(false)} aria-label="Tutup menu"/>}<div className="min-w-0 flex-1"><Navbar onMenu={()=>setOpen(true)}/><main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8"><Outlet/></main></div></div>}
