import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes.tsx'
import "./index.css"
import { GlobalProvider } from './store/demos/abyssal-shopping/GlobalProvider.tsx'
import './util/i18n.ts';

createRoot(document.getElementById('root')!).render(
  <GlobalProvider><RouterProvider router={routes} /></GlobalProvider>
)
