import { RouterProvider } from "react-router-dom";
import Router from "./Router";

function App() {

  return (
    <div className='font-bodyFont bg-gray-100'>
      <RouterProvider router={Router}/>
    </div>
  )
}

export default App
