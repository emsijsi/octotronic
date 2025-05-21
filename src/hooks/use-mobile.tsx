import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    // Safely access matchMedia with defensive check
    if (!window.matchMedia) {
      console.warn('window.matchMedia is not supported in this environment');
      return;
    }
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Use try-catch to handle any potential errors
    try {
      mql.addEventListener("change", onChange)
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    } catch (error) {
      console.error('Error setting up mobile detection:', error);
    }
    
    return () => {
      try {
        mql.removeEventListener("change", onChange)
      } catch (error) {
        console.error('Error cleaning up mobile detection:', error);
      }
    }
  }, [])
  
  // Default to desktop view if running in a non-browser environment
  return typeof window === 'undefined' ? false : !!isMobile
}
