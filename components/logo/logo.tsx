import logoStyle from './logo.module.css'

export default function Logo () {
    return (
        <div className={logoStyle.box}>
            <h1 className={logoStyle.headerText}>Foody</h1>
            <span className={logoStyle.headerPoint}>.</span>
        </div>
    );
}