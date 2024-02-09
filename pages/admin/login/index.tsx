import { useEffect, useState } from "react";
import style from './adminLogin.module.css'
import Logo from "../../../components/logo/logo";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import engLang from './../../../langJson/engJson.json';
import azeLang from './../../../langJson/azeJson.json';
import rusLang from './../../../langJson/rusJson.json';
import { ColorRing, Oval, RotatingLines, TailSpin, ThreeDots } from "react-loader-spinner";

export default function AdminLogin () {
    const router = useRouter();
    const [langURL, setLangURL] = useState('https://flagdownload.com/wp-content/uploads/Flag_of_United_Kingdom_Flat_Round-128x128.png')
    const [langOpen, setLangOpen] = useState(false)
    const [lang, setLang] = useState(engLang);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(router.locale == "en"){
            setLang(engLang)
            setLangURL('https://flagdownload.com/wp-content/uploads/Flag_of_United_Kingdom_Flat_Round-128x128.png')
        } else if(router.locale == "az"){
            setLang(azeLang)
            setLangURL("https://flagdownload.com/wp-content/uploads/Flag_of_Azerbaijan_Flat_Round-128x128.png")
        } else if(router.locale == "ru"){
            setLang(rusLang)
            setLangURL("https://flagdownload.com/wp-content/uploads/Flag_of_Russia_Flat_Round-128x128.png")
        }
    }, [router])
    
    var langArr = [
        <Link href={'/admin/login'} locale="en">
            <img className={style.langPhoto} src="https://flagdownload.com/wp-content/uploads/Flag_of_United_Kingdom_Flat_Round-128x128.png" alt="lang_eng" onClick={() => {
            setLangURL("https://flagdownload.com/wp-content/uploads/Flag_of_United_Kingdom_Flat_Round-128x128.png")
            setLangOpen(false)
        }}/>
        </Link>,
        <Link href={'/admin/login'} locale="az">
            <img className={style.langPhoto} src="https://flagdownload.com/wp-content/uploads/Flag_of_Azerbaijan_Flat_Round-128x128.png" alt="lang_aze" onClick={() => {
            setLangURL("https://flagdownload.com/wp-content/uploads/Flag_of_Azerbaijan_Flat_Round-128x128.png")
            setLangOpen(false)
        }}/>
        </Link>,
        <Link href={'/admin/login'} locale="ru">
            <img className={style.langPhoto} src="https://flagdownload.com/wp-content/uploads/Flag_of_Russia_Flat_Round-128x128.png" alt="lang_rus" onClick={() => {
            setLangURL("https://flagdownload.com/wp-content/uploads/Flag_of_Russia_Flat_Round-128x128.png")
            setLangOpen(false)
            console.log(router.locale)
        }}/>
        </Link>
    ]

    return(
        <>
        <Head>
            <title>{lang.admin} | {lang["sign-in"]}</title>
        </Head>
            <section className={style.box}>
                <header className={style.header}>
                    <Logo />
                </header>
                <div className={style.loginBox}>
                    <div className={style.loginBoxChild}>
                        {/* inputs container */}
                        <div className={style.inpBox}>
                            <div style={{width:"100%"}}>
                                <h2 className={style.inpBoxText}>{lang.welcome} {lang.admin}</h2>
                            </div>
                            <form className={style.inpBoxInd} onSubmit={(e) => {
                                e.preventDefault()
                            }}>
                                <input type="text" placeholder={lang.email} className={style.inp} onChange={(e) => {
                                    setEmail(e.target.value)
                                }}/>
                                <input type="password" placeholder={lang.password} className={style.inp} onChange={(e) => {
                                    setPassword(e.target.value)
                                }}/>
                                <button type="submit" className={style.btn} style={{display:"flex", justifyContent:"center", alignItems:"center"}} onClick={() => {
                                    setLoading(true)
                                    axios.post("https://foody-project-green.vercel.app/api/auth/signin", {
                                        email,
                                        password
                                    }).then(res => {
                                        console.log(res)
                                        window.localStorage.setItem("access-token", res.data.user.access_token)
                                        window.location.href = "/admin"
                                    }).catch(err => {
                                        alert("hata")
                                    })
                                }}>{loading ? <ThreeDots
                                    visible={true}
                                    height="80"
                                    width="80"
                                    color="#fff"
                                    radius="9"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    />: lang["sign-in"]}</button>
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