import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { PreferencesProvider } from '@/lib/store'
import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'
import Today from '@/pages/Today'
import Recipes from '@/pages/Recipes'
import RecipeDetail from '@/pages/RecipeDetail'
import Allergies from '@/pages/Allergies'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <PreferencesProvider>
      <HashRouter>
        <ScrollTop />
        <TopBar />
        <main className="mx-auto min-h-dvh max-w-md pb-28">
          <Routes>
            <Route path="/" element={<Today />} />
            <Route path="/recetas" element={<Recipes />} />
            <Route path="/receta/:id" element={<RecipeDetail />} />
            <Route path="/alergias" element={<Allergies />} />
            <Route path="*" element={<Today />} />
          </Routes>
        </main>
        <BottomNav />
      </HashRouter>
    </PreferencesProvider>
  )
}
