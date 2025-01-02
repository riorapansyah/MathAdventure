import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer';
import Navbar from './NavBar';

export default function index() {
    const location = useLocation();
    const isDetailPage = location.pathname.startsWith("/game") && location.pathname !== "/game";

    return (
        <>
            <Navbar />

            <div>
                <Outlet />
            </div>

            {!isDetailPage && (
                <Footer />
            )}
        </>
    )
}
