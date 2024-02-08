import Link from 'next/link';
import logoStyle from './logo.module.css'

export default function Logo () {
    return (
        <Link href="/admin" style={{textDecoration:"none"}}>
            <div className={logoStyle.box}>
                <h1 className={logoStyle.headerText}>Foody</h1>
                <span className={logoStyle.headerPoint}>.</span>
            </div>
        </Link>
    );
}