import Link from "next/link";
import styleFloat from './adminFloatNav.module.css';
import engLang from './../../../langJson/engJson.json';
import azeLang from './../../../langJson/azeJson.json';
import rusLang from './../../../langJson/rusJson.json';
import {IoGridOutline, IoStorefrontOutline, IoRestaurantOutline, IoCubeOutline, IoEaselOutline, IoPricetagOutline, IoLogOutOutline} from 'react-icons/io5'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminFloatNav () {

    const router = useRouter();
    const [lang, setLang] = useState(engLang);

    useEffect(() => {
        if(router.locale == "en"){
            setLang(engLang)
        } else if (router.locale == "az"){
            setLang(azeLang)
        } else if (router.locale == "ru"){
            setLang(rusLang)
        }
    }, [router])

    return(
        <>
            <section className={styleFloat.box}>
                <div className={styleFloat.linkboxHeadFoot}>
                    <Link href={'/admin'} className={styleFloat.link}>{lang["dashboard-nav"]}</Link>
                    <IoGridOutline />
                </div>
                <div className={styleFloat.linkbox}>
                    <Link href={'/admin/products/1'} className={styleFloat.link}>{lang["product-nav"]}</Link>
                    <IoStorefrontOutline />
                </div>
                <div className={styleFloat.linkbox}>
                    <Link href={'/admin/restaurant'} className={styleFloat.link}>{lang["restaurant-nav"]}</Link>
                    <IoRestaurantOutline />
                </div>
                <div className={styleFloat.linkbox}>
                    <Link href={'/admin/category'} className={styleFloat.link}>{lang["category-nav"]}</Link>
                    <IoCubeOutline />
                </div>
                <div className={styleFloat.linkbox}>
                    <Link href={'/admin/orders'} className={styleFloat.link}>{lang["order-nav"]}</Link>
                    <IoEaselOutline />
                </div>
                <div className={styleFloat.linkbox}>
                    <Link href={'/admin/offers'} className={styleFloat.link}>{lang["offer-nav"]}</Link>
                    <IoPricetagOutline />
                </div>
                <div className={styleFloat.linkbox}>
                    <Link href={'/admin/orders/history'} className={styleFloat.link}>{lang["orderH-nav"]}</Link>
                    <IoPricetagOutline />
                </div>
                <div className={styleFloat.linkboxHeadFoot}>
                    <button type="button" className={styleFloat.btnLogOut} onClick={() => {
                        localStorage.removeItem("access-token")
                        window.location.href = "/admin/login"
                    }}>
                        <IoLogOutOutline />
                        Log Out
                    </button>
                </div>
            </section>
        </>
    );
}