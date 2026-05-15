import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import './styles/hubDemoShell.css'
import './styles/pageAlign.css'
import { logHubConsoleGreeting } from './bootConsoleFun.js'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import AppErrorFallback from './components/AppErrorFallback.jsx'
import { AuthProvider } from './contexts/AuthProvider.jsx'
import { FavoritesProvider } from './contexts/FavoritesProvider.jsx'
import AppLayout from './layouts/AppLayout.jsx'
import AuthPage from './pages/AuthPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import HomePage from './pages/HomePage.jsx'
import FaqPage from './pages/FaqPage.jsx'
import PlaygroundPage from './pages/PlaygroundPage.jsx'
import MapStudyPage from './pages/MapStudyPage.jsx'
import StateStudyPage from './pages/StateStudyPage.jsx'
import ExtendedStudyPage from './pages/ExtendedStudyPage.jsx'
import UiKitPage from './pages/UiKitPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import FunctionsLayout from './pages/functions/FunctionsLayout.jsx'
import CoverageMethodPage from './pages/functions/CoverageMethodPage.jsx'
import PracticeLayout from './pages/practice/PracticeLayout.jsx'
import PracticeOverviewTab from './pages/practice/PracticeOverviewTab.jsx'
import PracticeUiTab from './pages/practice/PracticeUiTab.jsx'
import PracticeDataTab from './pages/practice/PracticeDataTab.jsx'
import PracticeWorkshopTab from './pages/practice/PracticeWorkshopTab.jsx'
import PracticeAsyncTab from './pages/practice/PracticeAsyncTab.jsx'
import PracticeQualityTab from './pages/practice/PracticeQualityTab.jsx'
import {
  FilterMethodPage,
  ReduceMethodPage,
  FindMethodPage,
  SomeEveryMethodPage,
  SortMethodPage,
  FlatMapMethodPage,
  IncludesMethodPage,
  SliceMethodPage,
  ObjectMethodPage,
  SetMethodPage,
} from './pages/functions/methodPages.jsx'

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('#root element not found')
}

type ErrorBoundaryFallbackProps = {
  error: Error | null
  reset: () => void
}

function renderAppErrorFallback(props: ErrorBoundaryFallbackProps) {
  return <AppErrorFallback {...props} />
}

createRoot(rootEl).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary renderFallback={renderAppErrorFallback}>
        <AuthProvider>
          <FavoritesProvider>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/playground" element={<PlaygroundPage />} />
                <Route path="/map-study" element={<Navigate to="/functions/map" replace />} />
                <Route path="/state-study" element={<Navigate to="/functions/state" replace />} />
                <Route path="/collection-study" element={<Navigate to="/functions/filter" replace />} />
                <Route path="/react-practice" element={<Navigate to="/practice/ui" replace />} />
                <Route path="/extended-study" element={<ExtendedStudyPage />} />
                <Route path="/functions" element={<FunctionsLayout />}>
                  <Route index element={<Navigate to="map" replace />} />
                  <Route path="map" element={<MapStudyPage />} />
                  <Route path="state" element={<StateStudyPage />} />
                  <Route path="filter" element={<FilterMethodPage />} />
                  <Route path="reduce" element={<ReduceMethodPage />} />
                  <Route path="find" element={<FindMethodPage />} />
                  <Route path="some-every" element={<SomeEveryMethodPage />} />
                  <Route path="sort" element={<SortMethodPage />} />
                  <Route path="flatMap" element={<FlatMapMethodPage />} />
                  <Route path="includes" element={<IncludesMethodPage />} />
                  <Route path="slice" element={<SliceMethodPage />} />
                  <Route path="object" element={<ObjectMethodPage />} />
                  <Route path="set" element={<SetMethodPage />} />
                  <Route path="coverage" element={<CoverageMethodPage />} />
                </Route>
                <Route path="/practice" element={<PracticeLayout />}>
                  <Route index element={<Navigate to="overview" replace />} />
                  <Route path="overview" element={<PracticeOverviewTab />} />
                  <Route path="ui" element={<PracticeUiTab />} />
                  <Route path="data" element={<PracticeDataTab />} />
                  <Route path="workshop" element={<PracticeWorkshopTab />} />
                  <Route path="async" element={<PracticeAsyncTab />} />
                  <Route path="quality" element={<PracticeQualityTab />} />
                </Route>
                <Route path="/ui-kit" element={<UiKitPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </FavoritesProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)

logHubConsoleGreeting()
