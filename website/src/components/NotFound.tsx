import React, { useState, useEffect } from 'react'
import FuzzyText from './FuzzyText'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'

const NotFound: React.FC = () => {
  const [intensity, setIntensity] = useState(0.2)

  // Create a pulsing effect for the 404 text
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIntensity(prev => 0.2 + Math.sin(Date.now() / 1000) * 0.1)
    }, 50)

    return () => clearInterval(intervalId)
  }, [])

  const handleGoBack = () => {
    // This will navigate to the previous page in browser history
    window.history.back()
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col items-center justify-center gap-8 p-4">
      <div className="text-center">
        <FuzzyText baseIntensity={intensity} >
          404
        </FuzzyText>
        <p className="text-gray-400 mb-8 text-xl">Oops! Page not found</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleGoBack}
          className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Go Back
        </Button>
      </div>
    </div>
  )
}
export default NotFound