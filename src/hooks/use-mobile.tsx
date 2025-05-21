import * as React from "react"
import { isBrowser } from "../utils/is-browser"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Skip completely if not in browser
    if (!isBrowser) return;
    
    try {
      const handleResize = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }
      
      // Initial check
      handleResize()
      
      // Add event listener
      window.addEventListener('resize', handleResize)
      
      // Cleanup
      return () => window.removeEventListener('resize', handleResize)
    } catch (error) {
      console.error('Error in useIsMobile hook:', error)
    }
  }, [])
  
  return isMobile
}
