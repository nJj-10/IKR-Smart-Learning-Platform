import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
export default function ProtectedRoute(){const{user,loading}=useAuth();if(loading)return <div className="grid min-h-screen place-items-center bg-navy-950 text-white">Memuatkan platform…</div>;return user?<Outlet/>:<Navigate to="/login" replace/>}
