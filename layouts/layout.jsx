import Footer from "../components/footer/footer";
import NavBar from "../components/navbar/adminNav/navbar";

export default function Layout ({children}) {
    return (
        <>
            <NavBar />
                <main>{children}</main>
            <Footer />
        </>
    );
}