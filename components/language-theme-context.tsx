'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type Language = 'fa' | 'en'
type Theme = 'light' | 'dark'

type LanguageAndThemeContextValue = {
  language: Language
  theme: Theme
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  toggleTheme: () => void
}

const LanguageAndThemeContext = createContext<LanguageAndThemeContextValue | null>(null)

export function LanguageAndThemeProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fa')
  const [theme, setTheme] = useState<Theme>('light')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('foorun-language')
    const savedTheme = window.localStorage.getItem('foorun-theme')
    if (savedLanguage === 'fa' || savedLanguage === 'en') setLanguageState(savedLanguage)
    if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    document.documentElement.lang = language
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr'
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem('foorun-language', language)
    window.localStorage.setItem('foorun-theme', theme)
  }, [language, theme, ready])

  const setLanguage = useCallback((next: Language) => setLanguageState(next), [])
  const toggleLanguage = useCallback(() => setLanguageState((current) => current === 'fa' ? 'en' : 'fa'), [])
  const toggleTheme = useCallback(() => setTheme((current) => current === 'light' ? 'dark' : 'light'), [])
  const value = useMemo(() => ({ language, theme, setLanguage, toggleLanguage, toggleTheme }), [language, theme, setLanguage, toggleLanguage, toggleTheme])

  return <LanguageAndThemeContext.Provider value={value}>{children}</LanguageAndThemeContext.Provider>
}

export function useLanguageAndTheme() {
  const context = useContext(LanguageAndThemeContext)
  if (!context) throw new Error('useLanguageAndTheme must be used within LanguageAndThemeProvider')
  return context
}

export type { Language, Theme }
export { LanguageAndThemeContext }
