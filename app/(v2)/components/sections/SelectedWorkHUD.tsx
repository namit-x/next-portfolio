'use client'

import { useScrollContext } from '../../context/ScrollContext'

export default function SelectedWorkHUD() {
    const { currentProject, sectionProgress } = useScrollContext()

    const breadcrumbs = ['', '/work/vesta', '/work/rag', '/work/clueless']
    const currentBreadcrumb = breadcrumbs[currentProject] || ''

    return (
        <>
            {/* Top-left: Breadcrumb */}
            <div className="selected-work__hud-breadcrumb">
                <span className="selected-work__breadcrumb-path">{currentBreadcrumb}</span>
            </div>

            {/* Top-right: Progress indicator (01 · 02 · 03) */}
            <div className="selected-work__hud-progress">
                {[1, 2, 3].map(num => (
                    <div
                        key={num}
                        className={`selected-work__progress-dot ${currentProject === num ? 'selected-work__progress-dot--active' : ''
                            }`}
                    >
                        {String(num).padStart(2, '0')}
                    </div>
                ))}
            </div>

            {/* Bottom-right: Scroll progress line with ticks */}
            <div className="selected-work__hud-scroll-indicator">
                {[1, 2, 3].map(tick => {
                    const tickProgress = (tick / 3) * 100
                    const isActive = sectionProgress >= tickProgress - 5
                    return (
                        <div
                            key={tick}
                            className={`selected-work__scroll-tick ${isActive ? 'selected-work__scroll-tick--active' : ''
                                }`}
                        />
                    )
                })}
            </div>
        </>
    )
}
