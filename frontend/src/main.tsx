import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { I18nProvider } from './contexts/I18nContext'
import { AuthProvider } from './contexts/AuthContext'
import { SettingsProvider } from './contexts/SettingsContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <I18nProvider>
                <ThemeProvider>
                    <AuthProvider>
                        <SettingsProvider>
                            <App />
                        </SettingsProvider>
                    </AuthProvider>
                </ThemeProvider>
            </I18nProvider>
        </BrowserRouter>
    </StrictMode>,
)

