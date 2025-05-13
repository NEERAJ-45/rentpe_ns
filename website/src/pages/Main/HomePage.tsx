import React from 'react'
import CategoryPage from '../Category/CategoryPage';

const HomePage: React.FC = () => {

  return (
    <React.Fragment>
      <CategoryPage />
      {/* other common sections */}
      <div className='bg-blue-300 w-full h-screen'>
        other content
      </div>
    </React.Fragment>
  )
}

export default HomePage