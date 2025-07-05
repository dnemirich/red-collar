import {Route, Routes} from "react-router";
import MainLayout from "./layouts/MainLayout.tsx";
import {HomePage} from "pages/home/HomePage.tsx";
import {FavouritesPage} from "pages/favourites/FavouritesPage.tsx";
import {ROUTES} from "shared/constants/routes.ts";

function App() {

  return (
    <MainLayout>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.FAVOURITES} element={<FavouritesPage />} />
      </Routes>
    </MainLayout>
  )
}

export default App
