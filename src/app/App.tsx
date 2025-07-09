import {BookPage} from "pages/book";
import {FavouritesPage} from "pages/favourites";
import {HomePage} from "pages/home";
import {useEffect} from "react";
import {Route, Routes} from "react-router";
import {toast, ToastContainer} from "react-toastify";
import {ROUTES} from "shared/constants/routes.ts";
import {useAppStore} from "shared/model/appStore.ts";

import MainLayout from "./layouts/MainLayout.tsx";

function App() {
    const {clearError, clearSuccess, error, success} = useAppStore();

    useEffect(() => {
        if (error) {
            toast.error(error, {
                autoClose: false,
                closeOnClick: true,
                position: 'top-right',
                theme: 'colored',
            });
            clearError();
        }
    }, [error, clearError]);

    useEffect(() => {
        if (success) {
            toast.success(success, {
                closeOnClick: true,
                position: 'top-right',
                theme: 'colored',
            });
            clearSuccess();
        }
    }, [success, clearSuccess]);

    return (
        <MainLayout>
            <Routes>
                <Route element={<HomePage/>} index/>
                <Route element={<FavouritesPage/>} path={ROUTES.FAVOURITES}/>
                <Route element={<BookPage/>} path={`${ROUTES.BOOK}/:bookId`}/>
            </Routes>
            <ToastContainer/>
        </MainLayout>
    )
}

export default App
