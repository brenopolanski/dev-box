import React from 'react'

// Mobile breakpoint (can be adjusted as needed)
const MOBILE_BREAKPOINT = 768

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    checkIfMobile()

    window.addEventListener('resize', checkIfMobile)

    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  return isMobile
}
