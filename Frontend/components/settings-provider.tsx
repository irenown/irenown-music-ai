"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiClient } from '@/lib/api'
import { useTheme } from 'next-themes'

interface Settings {
    notifications: any
    preferences: {
        defaultQuality: string
        defaultGenre: string
        rememberSettings: boolean
        autoDownload: boolean
        showAdvanced: boolean
        theme: string
        language: string
        timezone: string
        dateFormat: string
    }
    audio: any
    privacy: any
}

interface SettingsContextType {
    settings: Settings | null
    isLoading: boolean
    updateSettings: (newSettings: Partial<Settings>) => Promise<void>
    formatDate: (date: Date | string) => string
    formatMonth: (date: Date | string) => string
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<Settings | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { setTheme } = useTheme()

    const fetchSettings = async () => {
        try {
            const res = await apiClient.get('/api/user/settings')
            if (res.settings) {
                setSettings(res.settings)
                // Sync theme on load
                if (res.settings.preferences?.theme) {
                    setTheme(res.settings.preferences.theme)
                }
            }
        } catch (err) {
            console.error("Failed to fetch settings:", err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchSettings()
    }, [])

    const updateSettings = async (newSettings: Partial<Settings>) => {
        const currentSettings = settings || {
            notifications: {},
            preferences: {
                defaultQuality: "standard",
                defaultGenre: "pop",
                rememberSettings: true,
                autoDownload: false,
                showAdvanced: false,
                theme: "dark",
                language: "en",
                timezone: "America/New_York",
                dateFormat: "MM/DD/YYYY",
            },
            audio: {},
            privacy: {}
        }

        const updated = { ...currentSettings, ...newSettings }
        setSettings(updated)

        // If theme changed, apply it
        if (newSettings.preferences?.theme) {
            setTheme(newSettings.preferences.theme)
        }

        try {
            await apiClient.post('/api/user/settings', { settings: updated })
        } catch (err) {
            console.error("Failed to update settings:", err)
        }
    }

    const formatDate = (date: Date | string) => {
        const d = typeof date === 'string' ? new Date(date) : date
        if (isNaN(d.getTime())) return String(date)

        if (!settings?.preferences?.dateFormat) return d.toLocaleDateString()

        const format = settings.preferences.dateFormat
        const day = String(d.getDate()).padStart(2, '0')
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const year = d.getFullYear()

        if (format === 'DD/MM/YYYY') return `${day}/${month}/${year}`
        if (format === 'YYYY-MM-DD') return `${year}-${month}-${day}`
        return `${month}/${day}/${year}` // Default MM/DD/YYYY
    }

    const formatMonth = (date: Date | string) => {
        const d = typeof date === 'string' ? new Date(date) : date
        if (isNaN(d.getTime())) return String(date)

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return `${months[d.getMonth()]} ${d.getFullYear()}`
    }

    return (
        <SettingsContext.Provider value={{ settings, isLoading, updateSettings, formatDate, formatMonth }}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettings() {
    const context = useContext(SettingsContext)
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider')
    }
    return context
}
