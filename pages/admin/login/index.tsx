import { useState } from "react";
import style from './adminLogin.module.css'
import Logo from "../../../components/logo/logo";

export default function AdminLogin () {

    const [langURL, setLangURL] = useState('https://flagdownload.com/wp-content/uploads/Flag_of_United_Kingdom_Flat_Round-128x128.png')
    const [langOpen, setLangOpen] = useState(false)
    var langArr = [
        <img className={style.langPhoto} src="https://flagdownload.com/wp-content/uploads/Flag_of_United_Kingdom_Flat_Round-128x128.png" alt="lang_eng" onClick={() => {
            setLangURL("https://flagdownload.com/wp-content/uploads/Flag_of_United_Kingdom_Flat_Round-128x128.png")
            setLangOpen(false)
        }}/>,
        <img className={style.langPhoto} src="https://flagdownload.com/wp-content/uploads/Flag_of_Azerbaijan_Flat_Round-128x128.png" alt="lang_aze" onClick={() => {
            setLangURL("https://flagdownload.com/wp-content/uploads/Flag_of_Azerbaijan_Flat_Round-128x128.png")
            setLangOpen(false)
        }}/>,
        <img className={style.langPhoto} src="https://flagdownload.com/wp-content/uploads/Flag_of_Russia_Flat_Round-128x128.png" alt="lang_rus" onClick={() => {
            setLangURL("https://flagdownload.com/wp-content/uploads/Flag_of_Russia_Flat_Round-128x128.png")
            setLangOpen(false)
        }}/>
    ]

    return(
        <>
            <section className={style.box}>
                <header className={style.header}>
                    <Logo />
                </header>
                <div className={style.loginBox}>
                    <div className={style.loginBoxChild}>
                        {/* inputs container */}
                        <div className={style.inpBox}>
                            <div style={{width:"100%"}}>
                                <h2 className={style.inpBoxText}>Welcome Admin</h2>
                            </div>
                            <form className={style.inpBoxInd}>
                                <input type="text" placeholder="Username" className={style.inp}/>
                                <input type="password" placeholder="Password" className={style.inp}/>
                                <button type="submit" className={style.btn}>sign in</button>
                            </form>
                        </div>
                        {/* photo container */}
                        <div className={style.photoBox}>
                            {/* language container */}
                            <div style={{position:"relative", width:"100%"}}>
                                <div className={style.langBoxOpen}>
                                    <img className={style.langPhoto} src={langURL} alt="lang_img" onClick={() => {
                                        if(langOpen){
                                            setLangOpen(false)
                                        } else {
                                            setLangOpen(true)
                                        }
                                    }}/>
                                    <div style={langOpen ? {display:"flex", position:"absolute", flexDirection:"column", width:"100%", gap:"5px"} : {display:"none"}}>
                                        {langArr}
                                    </div>
                                </div>
                            </div>
                            {/* background illus container */}
                            <div style={{display:"flex", justifyContent:"center", padding:"3%"}}>
                                <img src="https://4rexvip.com/wp-content/uploads/2022/10/login1-768x678.png" alt="background_illus_img" className={style.backgroundImage}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}