import Logo from "../logo/logo";
import navStyle from './navbar.module.css'

export default function NavBar () {
    return(
        <>
            <header className={navStyle.header}>
                <div>
                    <Logo />
                </div>
                <div>
                    <div>
                        <button>+ ADD PRODUCT</button>
                    </div>
                </div>
            </header>
        </>
    );
}