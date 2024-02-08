import Head from "next/head"
import historyStyle from './history.module.css'
import NavBarAdmin from "../../../../components/navbar/adminNav/navbar";
import AdminFloatNav from "../../../../components/navbar/adminFloatNav/AdminFloatNav";
import AdminFootEaCamp from "../../../../components/footer/adminFooter/adminEaCampFoot/AdminFootEaCamp";
import { useEffect, useState } from "react";
import axios from "axios";
import { id } from "date-fns/locale";
import engLang from './../../../../langJson/engJson.json';
import azeLang from './../../../../langJson/azeJson.json';
import rusLang from './../../../../langJson/rusJson.json';
import { useRouter } from "next/router";

export default function History () {

    const router = useRouter();
    const [history, setHistory] = useState([]);
    const [lang, setLang] = useState(engLang)

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
        axios.get("http://localhost:3000/api/order/history", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`
            }
        })
            .then(res => {
                setHistory(res.data.result.data)
            }).catch((err) => {
                alert(err)
            })
    }, [])

    useEffect(() => {
        if(!localStorage.getItem("access-token")){
            window.location.href = "/admin/login"
        }
      }, [])

    return(
        <>
            <Head>
                <title>{lang.admin} | {lang["orderH-nav"]}</title>
            </Head>
            <section className={historyStyle.box}>
                <div>
                    <NavBarAdmin />
                </div>
                <div className={historyStyle.main}>
                    <div className={historyStyle.floatNavDiv}>
                        <AdminFloatNav />
                        <AdminFootEaCamp />
                    </div>
                    <div className={historyStyle.mainInd}>
                        <div className={historyStyle.mainHeadText}>
                            <h2>{lang.history}</h2>
                        </div>
                        <div className={historyStyle.listHistory}>
                            <div className={historyStyle.listHistoryHead}>
                                <h3>ID</h3>
                                <h3>{lang.customer} ID</h3>
                                <h3>{lang.time}</h3>
                                <h3>{lang.delivery_address}</h3>
                                <h3>{lang.price}</h3>
                                <h3>{lang.payment_method}</h3>
                                <h3>{lang.contact}</h3>
                                <h3>{lang.edit}</h3>
                            </div>
                            <div className={historyStyle.listHistoryMain}>
                                {history.map(order => (
                                    <div className={historyStyle.listOne}>
                                        <h3>{order.id.split("").slice(0,4).join("")}...</h3>
                                        <h3>{order.customer_id.split("").slice(0,4).join("")}...</h3>
                                        <h3>{new Date}</h3>
                                        <h3>{order.delivery_address}</h3>
                                        <h3>{order.amount}</h3>
                                        <h3>{order.payment_method == 0 ? "Card" : "Cash on delivery"}</h3>
                                        <h3>{order.contact}</h3>
                                        <button>Sil</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}