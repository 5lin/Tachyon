import { createContext, useContext, useState, type ReactNode } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || ''

interface User {
    id: string
    name: string
    email?: string
    avatar?: string
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    authEnabled: boolean
    login: () => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [authEnabled, setAuthEnabled] = useState(false)

    // Check auth status on mount
    useState(() => {
        checkAuth()
    })

    async function checkAuth() {
        try {
            // Check config first
            const configRes = await fetch(`${API_BASE}/api/config`)
            if (configRes.ok) {
                const config = await configRes.json()
                setAuthEnabled(config.authEnabled)

                if (config.authEnabled) {
                    const res = await fetch(`${API_BASE}/api/auth/me`, { credentials: 'include' })
                    if (res.ok) {
                        const data = await res.json()
                        setUser(data.user)
                    }
                }
            }
        } catch {
            // Error
        } finally {
            setIsLoading(false)
        }
    }

    const login = () => {
        window.location.href = `${API_BASE}/api/auth/login`
    }

    const logout = async () => {
        try {
            await fetch(`${API_BASE}/api/auth/logout`, { method: 'POST', credentials: 'include' })
            setUser(null)
            window.location.href = '/'
        } catch {
            // Error logging out
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                authEnabled,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
