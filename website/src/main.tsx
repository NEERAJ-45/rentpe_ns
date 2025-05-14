import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* <ReactQueryDevtools
        initialIsOpen={false}
        position="right"
        buttonPosition='bottom-left'
      /> */}
    </QueryClientProvider>
  </Provider>
)
