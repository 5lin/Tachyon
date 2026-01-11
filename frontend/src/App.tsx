import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Reader from './pages/Reader'
import Login from './pages/Login'

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/read/:id" element={<Reader />} />
            <Route path="/login" element={<Login />} />
            <Route path="/callback" element={<CallbackHandler />} />
        </Routes>
    )
}

// Callback handler - redirects after OIDC callback
function CallbackHandler() {
    // The backend handles the callback and redirects to /
    // This is just a fallback in case someone lands here directly
    return (
        <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl border-2 border-[var(--color-accent)]/30 border-t-[var(--color-accent)] animate-spin" />
                <p className="mt-4 text-[var(--color-text-muted)] text-sm">处理登录中...</p>
            </div>
        </div>
    )
}
