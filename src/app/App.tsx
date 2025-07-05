import {Route, Routes} from "react-router";
import MainLayout from "./layouts/MainLayout.tsx";
import {HomePage} from "pages/home/HomePage.tsx";

function App() {

  return (
    <MainLayout>
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
    </MainLayout>
  )
}

export default App
