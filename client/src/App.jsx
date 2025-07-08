
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import RootLayout from "./pages/RootLayout"
import ErrorPage from "./pages/ErrrorPage"
import Login from "./pages/Login" 
import Register from "./pages/Register"
import Results from "./pages/Results"
import Elections from "./pages/Elections"
import ElectionDetails from "./pages/ElectionDetails"
import Candidates from "./pages/Candidates"
import Congrats from "./pages/Congrates"
import Logout from "./pages/Logout"
import Header from './components/Header'

const router = createBrowserRouter([
  { 
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        
        index: true,
        element: <Header /> // Changed from <Header /> to <Login />
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'results',
        element: <Results />,
      },
      {
        path: 'elections',
        element: <Elections />,
      },
      {
        path: 'elections/:id',
        element: <ElectionDetails />,
      },
      {
        path: 'elections/:id/candidates',
        element: <Candidates />,
      },
      {
        path: 'congrats',
        element: <Congrats />,
      },
      {
        path: 'logout',
        element: <Logout />,
      }
    ]
  }
])

function App() {
  return (
   <RouterProvider router={router} />
  )
}

export default App
