import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PublicWebsite from './components/PublicWebsite.jsx'
import AdminApp from './components/AdminApp.jsx'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicWebsite />} />
        <Route path="/admin" element={<AdminApp />} />
      </Routes>
    </Router>
  )
}
