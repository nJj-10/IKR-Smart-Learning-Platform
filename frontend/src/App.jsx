import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import RoleRoute from "./routes/RoleRoute.jsx";
import AppLayout from "./components/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import LecturerDashboard from "./pages/LecturerDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Modules from "./pages/Modules.jsx";
import ModuleDetail from "./pages/ModuleDetail.jsx";
import Quiz from "./pages/Quiz.jsx";
import QuizResult from "./pages/QuizResult.jsx";
import Scores from "./pages/Scores.jsx";
import Ranking from "./pages/Ranking.jsx";
import Progress from "./pages/Progress.jsx";
import AITutor from "./pages/AITutor.jsx";
import Chat from "./pages/Chat.jsx";

export default function App(){return <Routes><Route path="/" element={<Navigate to="/login" replace/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route element={<ProtectedRoute/>}><Route element={<AppLayout/>}><Route element={<RoleRoute roles={['student']}/>}><Route path="/dashboard" element={<StudentDashboard/>}/><Route path="/scores" element={<Scores/>}/><Route path="/progress" element={<Progress/>}/></Route><Route element={<RoleRoute roles={['lecturer','admin']}/>}><Route path="/lecturer" element={<LecturerDashboard/>}/></Route><Route element={<RoleRoute roles={['admin']}/>}><Route path="/admin" element={<AdminDashboard/>}/></Route><Route path="/modules" element={<Modules/>}/><Route path="/modules/:code" element={<ModuleDetail/>}/><Route path="/quiz" element={<Quiz/>}/><Route path="/quiz/result" element={<QuizResult/>}/><Route path="/ranking" element={<Ranking/>}/><Route path="/ai-tutor" element={<AITutor/>}/><Route path="/chat" element={<Chat/>}/></Route></Route><Route path="*" element={<Navigate to="/login" replace/>}/></Routes>}
