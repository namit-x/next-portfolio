'use client'

import Background from './Background'
import SmoothScroll from './SmoothScroll'
import { ThemeProvider } from './ThemeContext';

function App() {
    return (
        <SmoothScroll>
            <ThemeProvider>
                <div className="relative w-screen min-h-screen overflow-x-hidden custom-selection">
                    <Background />
                </div>
            </ThemeProvider>
        </SmoothScroll>
    )
}

export default App
