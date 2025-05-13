import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { CategoryProvider } from './context/useCategoryContext'

export default function App() {
  return (
    <React.Fragment>

      {/* for experiment ui managment is in context later will be converted to redux */}
      <CategoryProvider>
        <AppRoutes />
      </CategoryProvider>

    </React.Fragment>
  )
}
