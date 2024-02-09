import Head from "next/head"
import NavBarAdmin from "../../../components/navbar/adminNav/navbar";
import orderStyle from './orders.module.css'
import AdminFloatNav from "../../../components/navbar/adminFloatNav/AdminFloatNav";
import AdminFootEaCamp from "../../../components/footer/adminFooter/adminEaCampFoot/AdminFootEaCamp";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoTrashOutline } from "react-icons/io5";
import engLang from './../../../langJson/engJson.json';
import azeLang from './../../../langJson/azeJson.json';
import rusLang from './../../../langJson/rusJson.json';
import { useRouter } from "next/router";

export default function Orders () {

    const router = useRouter();
    const [dataOrders, setDataOrders] = useState([])
    const [lang, setLang] = useState(engLang)


    useEffect(() => {
        if(!localStorage.getItem("access-token")){
            window.location.href = "/admin/login"
        }
    }, [])

    useEffect(() => {
        if(router.locale == "en"){
            setLang(engLang)
        } else if(router.locale == "az"){
            setLang(azeLang)
        } else if(router.locale == "ru"){
            setLang(rusLang)
        }
    }, [router])

    useEffect(() => {
        axios.get("http://localhost:3000/api/order", {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("access-token")}`
            }
        })
            .then((res) => {
                setDataOrders(res.data.result.data)
            }).catch((err) => {
                alert("hata")
            })
    }, [])

    return(
        <>
            <Head>
                <title>{lang.admin} | {lang.orders}</title>
            </Head>
            <section className={orderStyle.box}>
                <header>
                    <NavBarAdmin />
                </header>
                <div className={orderStyle.mainBox}>
                    <div className={orderStyle.navFloatBox}>
                        <div>
                            <AdminFloatNav />
                        </div>
                        <div>
                            <AdminFootEaCamp />
                        </div>
                    </div>
                    <div className={orderStyle.mainInd}>
                        <div className={orderStyle.headerMainBox}>
                            <h2>{lang.orders}</h2>
                        </div>
                        <div className={orderStyle.listBoxMain}>
                            <div className={orderStyle.listBoxMainHead}>
                                <h3 style={{width:"12%"}} className={orderStyle.headerMainTextList}>ID</h3>
                                <h3 style={{width:"12%"}} className={orderStyle.headerMainTextList}>{lang.customer} ID</h3>
                                <h3 style={{width:"12%"}} className={orderStyle.headerMainTextList}>{lang.time}</h3>
                                <h3 style={{width:"12%"}} className={orderStyle.headerMainTextList}>{lang.delivery_address}</h3>
                                <h3 style={{width:"12%"}} className={orderStyle.headerMainTextList}>{lang.price}</h3>
                                <h3 style={{width:"12%"}} className={orderStyle.headerMainTextList}>{lang.payment_method}</h3>
                                <h3 style={{width:"12%"}} className={orderStyle.headerMainTextList}>{lang.contact}</h3>
                                <h3 style={{width:"12%"}} className={orderStyle.headerMainTextList}>{lang.edit}</h3>
                            </div>
                            <div className={orderStyle.listBoxMainInd}>
                                {dataOrders.length >= 1 ? 
                                    dataOrders.map((item:any) => (
                                        <div className={orderStyle.oneList}>
                                            <h3 style={{width:"12%"}} className={orderStyle.headerMainTextListID}>{item.id.split("").slice(0,5).join('')}</h3>
                                            <h3 style={{width:"12%"}} className={orderStyle.headerMainTextListID}>{item.custome_id.split("").slice(0,5).join('')}</h3>
                                            <h3 style={{width:"12%"}} className={orderStyle.headerMainTextList}>{new Date().toISOString()}</h3>
                                            <h3 style={{width:"12%"}} className={orderStyle.headerMainTextList}>{`${item.delivery_address.split("").slice(0,8).join("")}...`}</h3>
                                            <h3 style={{width:"12%"}} className={orderStyle.headerMainTextList}>{item.amount}$</h3>
                                            <h3 style={{width:"12%"}} className={orderStyle.headerMainTextList}>{item.payment_method == 1 ? "Cart" : "Cash on delivery"}</h3>
                                            <h3 style={{width:"12%"}} className={orderStyle.headerMainTextList}>{item.contact}</h3>
                                            <div style={{width:"12%"}} className={orderStyle.headerMainTextBtnBox}>
                                                <button><IoTrashOutline /></button>
                                            </div>
                                        </div>
                                    ))
                                 : <div>
                                    <h3 className={orderStyle.oopsMessage}>Opps! Orders not found</h3>    
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}