import { CSS_NAMESPACE } from '../../constants'

/**
 * Clears existing drawings and creates a new canvas if drawing is still active
 * @param isActive - Whether drawing is still active
 */
export const clearDrawings = (isActive: boolean) => {
  // Remove existing canvas
  const existingCanvas = document.querySelector(`.${CSS_NAMESPACE}-draw-canvas`) as HTMLCanvasElement

  if (existingCanvas) {
    existingCanvas.remove()
  }

  // Only recreate if drawing is still active
  if (isActive) {
    // Create new canvas
    const canvas = document.createElement('canvas')
    canvas.className = `${CSS_NAMESPACE}-draw-canvas`
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.zIndex = '2147483645'
    canvas.style.pointerEvents = 'auto'
    document.body.appendChild(canvas)

    // Configure canvas
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    // Set up context
    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.scale(dpr, dpr)
      ctx.strokeStyle = '#FF0000'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
    }

    // Add event listeners
    let isFirstPoint = false
    let isCurrentlyDrawing = false

    const getMousePos = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()

      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }
    }

    const draw = (event: MouseEvent) => {
      if (!isCurrentlyDrawing) {
        return
      }

      const { x, y } = getMousePos(event)

      if (isFirstPoint) {
        ctx?.beginPath()
        ctx?.moveTo(x, y)
        isFirstPoint = false
      } else {
        ctx?.lineTo(x, y)
        ctx?.stroke()
      }
    }

    const startDrawing = (event: MouseEvent) => {
      isFirstPoint = true
      isCurrentlyDrawing = true
      draw(event)
    }

    const stopDrawing = () => {
      if (isCurrentlyDrawing && ctx) {
        ctx.stroke()
      }

      isCurrentlyDrawing = false
    }

    canvas.addEventListener('mousedown', startDrawing)
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('mouseup', stopDrawing)
    canvas.addEventListener('mouseout', stopDrawing)

    // Handle resize
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      const newWidth = rect.width * dpr
      const newHeight = rect.height * dpr

      // Only proceed if dimensions are valid
      if (newWidth === 0 || newHeight === 0) {
        return
      }

      // Save current drawing
      const tempCanvas = document.createElement('canvas')
      const tempCtx = tempCanvas.getContext('2d')
      tempCanvas.width = canvas.width
      tempCanvas.height = canvas.height

      // Only copy if the original canvas has valid dimensions
      if (canvas.width > 0 && canvas.height > 0 && tempCtx && ctx) {
        tempCtx.drawImage(canvas, 0, 0)
      }

      // Resize canvas
      canvas.width = newWidth
      canvas.height = newHeight

      // Restore context properties and drawing
      if (ctx) {
        ctx.scale(dpr, dpr)
        ctx.strokeStyle = '#FF0000'
        ctx.lineWidth = 2
        ctx.lineCap = 'round'

        // Only restore if we have valid dimensions
        if (tempCanvas.width > 0 && tempCanvas.height > 0) {
          ctx.drawImage(tempCanvas, 0, 0)
        }
      }
    }

    // Debounce the resize handler to prevent too many updates
    let resizeTimeout: NodeJS.Timeout

    const debouncedResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(handleResize, 100)
    }

    window.addEventListener('resize', debouncedResize)
  }
}
