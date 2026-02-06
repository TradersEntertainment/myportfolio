"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function Tracker() {
    const pathname = usePathname();
    const hasTrackedInitialLoad = useRef(false);

    // Track page views
    useEffect(() => {
        // Prevent double tracking in strict mode
        if (process.env.NODE_ENV === 'development' && hasTrackedInitialLoad.current) {
            return;
        }
        hasTrackedInitialLoad.current = true;

        const trackPageView = async () => {
            try {
                await fetch('/api/track', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        type: 'visit',
                        data: {
                            url: window.location.href,
                            referrer: document.referrer,
                        },
                    }),
                });
            } catch (error) {
                console.error('Failed to track page view:', error);
            }
        };

        trackPageView();
    }, [pathname]);

    // Track interactions (clicks)
    useEffect(() => {
        const handleClick = async (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if the clicked element or its parent is interactive (button, link, etc.)
            const interactiveElement = target.closest('a, button, [role="button"]') as HTMLElement;

            if (interactiveElement) {
                let label = interactiveElement.innerText || interactiveElement.getAttribute('aria-label') || 'Unknown element';
                let action = interactiveElement.tagName.toLowerCase();

                if (interactiveElement.tagName === 'A') {
                    action = `Link Click (${(interactiveElement as HTMLAnchorElement).href})`;
                }

                try {
                    await fetch('/api/track', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            type: 'interaction',
                            data: {
                                action: action,
                                label: label,
                                url: window.location.href,
                            },
                        }),
                    });
                } catch (error) {
                    console.error('Failed to track interaction:', error);
                }
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return null;
}
