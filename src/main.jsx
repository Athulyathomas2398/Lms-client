import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min (6).css'
import { BrowserRouter } from 'react-router-dom'
import CourseContext from './contexts/CourseContext.jsx'
import AuthContext from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(

<AuthContext>
<CourseContext>

<BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>,
  </BrowserRouter>

</CourseContext>
</AuthContext>

)
