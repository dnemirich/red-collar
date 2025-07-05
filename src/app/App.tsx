import {Route, Routes} from "react-router";
import MainLayout from "./layouts/MainLayout.tsx";

import {FavouritesPage} from "pages/favourites";
import {ROUTES} from "shared/constants/routes.ts";
import {HomePage} from "pages/home";
import {BookPage} from "pages/book";

function App() {

  return (
    <MainLayout>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.FAVOURITES} element={<FavouritesPage />} />
          <Route path={`${ROUTES.BOOK}/:bookId`} element={<BookPage />} />
      </Routes>
    </MainLayout>
  )
}

export default App
