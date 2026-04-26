'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface ScrollContextValue {
    currentProject: number // 0 = entry, 1 = vesta, 2 = rag, 3 = clueless
    projectProgress: number // 0-100% within current project
    sectionProgress: number // 0-100% overall section
    setCurrentProject: (project: number) => void
    setProjectProgress: (progress: number) => void
    setSectionProgress: (progress: number) => void
}

const ScrollCtx = createContext<ScrollContextValue | null>(null)

export function useScrollContext() {
    const ctx = useContext(ScrollCtx)
    if (!ctx) {
        throw new Error('useScrollContext must be used within ScrollContextProvider')
    }
    return ctx
}

export function ScrollContextProvider({ children }: { children: ReactNode }) {
    const [currentProject, setCurrentProject] = useState(0)
    const [projectProgress, setProjectProgress] = useState(0)
    const [sectionProgress, setSectionProgress] = useState(0)

    const value: ScrollContextValue = {
        currentProject,
        projectProgress,
        sectionProgress,
        setCurrentProject,
        setProjectProgress,
        setSectionProgress,
    }

    return <ScrollCtx.Provider value={value}>{children}</ScrollCtx.Provider>
}
