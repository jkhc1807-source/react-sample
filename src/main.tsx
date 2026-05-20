import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import './styles/hubDemoShell.css'
import './styles/pageAlign.css'
import { logHubConsoleGreeting } from './bootConsoleFun'
import ErrorBoundary from './components/ErrorBoundary'
import AppErrorFallback from './components/AppErrorFallback'
import { AuthProvider } from './contexts/AuthProvider'
import { FavoritesProvider } from './contexts/FavoritesProvider'
import AppLayout from './layouts/AppLayout'
import AuthPage from './pages/AuthPage'
import AdminPage from './pages/AdminPage'
import HomePage from './pages/HomePage'
import FaqPage from './pages/FaqPage'
import PlaygroundPage from './pages/PlaygroundPage'
import MapStudyPage from './pages/MapStudyPage'
import StateStudyPage from './pages/StateStudyPage'
import ExtendedStudyPage from './pages/ExtendedStudyPage'
import UiKitPage from './pages/UiKitPage'
import NotFoundPage from './pages/NotFoundPage'
import FunctionsLayout from './pages/functions/FunctionsLayout'
import CoverageMethodPage from './pages/functions/CoverageMethodPage'
import PracticeLayout from './pages/practice/PracticeLayout'
import PracticeOverviewTab from './pages/practice/PracticeOverviewTab'
import PracticeUiTab from './pages/practice/PracticeUiTab'
import PracticeDataTab from './pages/practice/PracticeDataTab'
import PracticeWorkshopTab from './pages/practice/PracticeWorkshopTab'
import PracticeAsyncTab from './pages/practice/PracticeAsyncTab'
import PracticeQualityTab from './pages/practice/PracticeQualityTab'
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
} from './pages/functions/methodPages'

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('#root element not found')
}

function renderAppErrorFallback(props: { error: Error | null; reset: () => void }) {
  return <AppErrorFallback {...props} />
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(rootEl).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
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
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </FavoritesProvider>
          </AuthProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)

logHubConsoleGreeting()
