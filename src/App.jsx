import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from "react-router"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './App.css'
import { MainLayout } from "./components/Layout/MainLayout"
import { FetchRq} from "./pages/FetchRq"
import { FetchInd} from "./pages/FetchInd"

// The router instance is created using the createBrowserRouter function
// and defines the routes and their corresponding components
const router = createBrowserRouter([
  {
    // The MainLayout component is used as a wrapper for all routes
    // It contains the header and footer components
    path:"/",
    element:<MainLayout/>,
    // The children array defines the routes for the application
    children:[
      // The FetchRq component is used for the /rd route
      // It fetches data using the React Query library
      {
        path:"/rq",
        element:<FetchRq/>,
      },
      {
        path:"/rq/:id",
        element:<FetchInd/>,
      },
    ]
  }
])

function App() {
  // STEP 1: Create a QueryClient instance
  // This instance is used to configure the React Query library
  // and manage the cache and background updates
  const queryClient = new QueryClient();
  return (
    <>
    {/* // STEP 2: Wrap your application with the QueryClientProvider
    // This allows you to use React Query throughout your application
    // and provides the queryClient instance to all components
    // that need it
    // The ReactQueryDevtools component is used to provide a UI for debugging
    // and inspecting the React Query cache
    // It is not necessary for the functionality of React Query
    // but can be helpful during development */}
    <QueryClientProvider client={queryClient}>
      {/* // STEP 3: Use the RouterProvider to manage routing in your application
      // The RouterProvider takes a router instance as a prop */}
        <RouterProvider router={router}/>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </>
  )
}

export default App
