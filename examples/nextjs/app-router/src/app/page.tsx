'use client'

export default function Home() {
  const triggerConsoleLogs = () => {
    console.log('Regular log message')
    console.info('Info message')
    console.warn('Warning message')
    console.error('Error message')
    console.debug('Debug message')

    // Object logging example
    console.log('User object:', {
      id: 1,
      email: 'john@example.com',
      name: 'John Doe',
      preferences: {
        notifications: true,
        theme: 'dark',
      },
    })

    // Array logging
    console.table(['Apple', 'Banana', 'Cherry', 'Date'])

    // Performance measurement
    console.time('Timer test')
    setTimeout(() => {
      console.timeEnd('Timer test')
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="mx-auto max-w-6xl p-8">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-blue-800">DevBox Demo</h1>
          <p className="text-lg text-gray-600">A developer toolbox for React applications</p>
        </header>

        <section className="mb-12 rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">Available Tools</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-md bg-blue-50 p-4 shadow">
              <h3 className="mb-2 font-medium text-blue-700">Screen Size</h3>
              <p className="text-sm text-gray-600">Shows current viewport dimensions</p>
            </div>

            <div className="rounded-md bg-green-50 p-4 shadow">
              <h3 className="mb-2 font-medium text-green-700">Environment Mode</h3>
              <p className="text-sm text-gray-600">Displays current environment (development/production)</p>
            </div>

            <div className="rounded-md bg-purple-50 p-4 shadow">
              <h3 className="mb-2 font-medium text-purple-700">Cursor Position</h3>
              <p className="text-sm text-gray-600">Shows real-time cursor coordinates</p>
            </div>

            <div className="rounded-md bg-yellow-50 p-4 shadow">
              <h3 className="mb-2 font-medium text-yellow-700">Date & Time</h3>
              <p className="text-sm text-gray-600">Displays current date and time</p>
            </div>

            <div className="rounded-md bg-red-50 p-4 shadow">
              <h3 className="mb-2 font-medium text-red-700">CSS Debug</h3>
              <p className="text-sm text-gray-600">Highlight HTML elements for CSS debugging</p>
            </div>

            <div className="rounded-md bg-indigo-50 p-4 shadow">
              <h3 className="mb-2 font-medium text-indigo-700">Ruler</h3>
              <p className="text-sm text-gray-600">Measure dimensions and distances on the page</p>
            </div>

            <div className="rounded-md bg-pink-50 p-4 shadow">
              <h3 className="mb-2 font-medium text-pink-700">Inspector</h3>
              <p className="text-sm text-gray-600">Inspect and analyze HTML elements</p>
            </div>

            <div className="rounded-md bg-teal-50 p-4 shadow">
              <h3 className="mb-2 font-medium text-teal-700">Design Mode</h3>
              <p className="text-sm text-gray-600">Edit content directly in the browser</p>
            </div>

            <div className="rounded-md bg-orange-50 p-4 shadow">
              <h3 className="mb-2 font-medium text-orange-700">Draw</h3>
              <p className="text-sm text-gray-600">Draw and annotate on the page</p>
            </div>

            <div className="rounded-md bg-cyan-50 p-4 shadow">
              <h3 className="mb-2 font-medium text-cyan-700">SEO</h3>
              <p className="text-sm text-gray-600">Analyze page for SEO optimization</p>
            </div>

            <div className="rounded-md bg-lime-50 p-4 shadow">
              <h3 className="mb-2 font-medium text-lime-700">Console</h3>
              <p className="text-sm text-gray-600">View console logs directly on the page</p>
            </div>
          </div>
        </section>

        <section className="mb-12 rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">Testing Area</h2>
          <p className="mb-4">This area contains various HTML elements to test the DevBox tools:</p>

          <div className="space-y-6">
            <div className="rounded border border-gray-200 p-4">
              <h3 className="mb-2 text-xl font-medium">Text Elements</h3>
              <p>Regular paragraph text for testing.</p>
              <p className="text-sm text-gray-500">Small text with gray color.</p>
              <p className="text-lg font-bold text-blue-600">Larger bold text with blue color.</p>
            </div>

            <div className="rounded border border-gray-200 p-4">
              <h3 className="mb-2 text-xl font-medium">Interactive Elements</h3>
              <button className="mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Button</button>
              <a className="text-blue-500 hover:underline" href="#">
                Link
              </a>
              <div className="mt-4">
                <label className="mr-2">Checkbox:</label>
                <input type="checkbox" />
              </div>

              {/* Console trigger button */}
              <div className="mt-4">
                <button
                  className="mt-2 rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
                  onClick={triggerConsoleLogs}
                >
                  Trigger Console Logs
                </button>
              </div>
            </div>

            <div className="rounded border border-gray-200 p-4">
              <h3 className="mb-2 text-xl font-medium">Image</h3>
              <div className="flex h-40 w-full items-center justify-center bg-gray-300 text-center">
                <span>Placeholder Image</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-gray-800 p-6 text-center text-white">
        <p>DevBox: A developer toolbox for React applications</p>
      </footer>
    </div>
  )
}
