import footEacampStyle from './adminFootEacamp.module.css';

export default function AdminFootEaCamp () {
    return(
        <>
            <div className={footEacampStyle.boxFoot}>
                <div className={footEacampStyle.imgBox}>
                    <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ85Huj8HKLtySn3ob6EK3uK-Q0YENQdKVvg5ivNZXaFye9Np1U" alt="eacamp_logo" className={footEacampStyle.img}/>
                    <h3 className={footEacampStyle.textFoot}>EACAMP</h3>
                </div>
                <h4 className={footEacampStyle.text}>Version 1.0.0</h4>
                <h5 className={footEacampStyle.text}>2024</h5>
            </div>
        </>
    );
}