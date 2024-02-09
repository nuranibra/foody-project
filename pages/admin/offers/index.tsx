import Head from "next/head"
import AdminFloatNav from "../../../components/navbar/adminFloatNav/AdminFloatNav";
import AdminFootEaCamp from "../../../components/footer/adminFooter/adminEaCampFoot/AdminFootEaCamp";
import NavBarAdmin from "../../../components/navbar/adminNav/navbar";
import offStyle from './offers.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
import styleProd from './../products/products.module.css';
import catStyle from './../category/category.module.css';
import styleInd from './../index.module.css';
import { IoCloseCircle, IoCloseCircleOutline, IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import engLang from './../../../langJson/engJson.json';
import azeLang from './../../../langJson/azeJson.json';
import rusLang from './../../../langJson/rusJson.json';
import { useRouter } from "next/router";

export default function Offers() {

    const router = useRouter();
    const [offersData, setOffersData] = useState([])
    const [trashOpen, setTrashOpen] = useState(false)
    const [addOpen, setAddOpen] = useState(false);
    const [fileName, setFileName] = useState("Not choose image");
    const [imageProd, setImageProd] = useState("");
    const [addTitle, setAddTitle] = useState("");
    const [addDescription, setAddDescription] = useState("")
    const [lang, setLang] = useState(engLang)
    const [errorOpen, setErrorOpen] = useState(false)
    const [error, setError] = useState("")
    const [offerID, setOfferID] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/offer")
            .then(res => {
                setOffersData(res.data.result.data)
            }).catch((err: any) => {
                alert(err)
            })
    }, [trashOpen, addOpen])

    useEffect(() => {
        if (!localStorage.getItem("access-token")) {
            window.location.href = "/admin/login"
        }
    }, [])

    useEffect(() => {
        if (router.locale == "en") {
            setLang(engLang)
        } else if (router.locale == "az") {
            setLang(azeLang)
        } else if (router.locale == "ru") {
            setLang(rusLang)
        }
    }, [router])

    return (
        <>
            <Head>
                <title>{lang.admin} | {lang["offer-nav"]}</title>
            </Head>
            <section className={offStyle.box}>
                <div>
                    <NavBarAdmin />
                </div>
                <div className={offStyle.mainBox}>
                    {errorOpen ? <section style={{ top: "0", left: "0", position: "absolute", zIndex: "101", width: "100%", height: "50px", display: "flex", justifyContent: "center" }}>
                        <div style={{ backgroundColor: "#fff", boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px", display: "flex", justifyContent: "space-around", alignItems: "center", borderRadius: "10px", marginTop: "1%" }} className={styleInd.messageBox}>
                            <IoCloseCircleOutline style={{ color: "#860000" }} size={30} />
                            <div>
                                <h2 className={styleInd.completedText}>{error}</h2>
                            </div>
                        </div>
                    </section> : ''}
                    <section style={addOpen ? { position: "absolute", backgroundColor: "rgba(0,0,0,0.635)", display: "flex", justifyContent: "flex-end", zIndex: "102", top: "0", left: "0", width: "100%", height: "100%", transform: "calc(0.3s)" } : { display: "none" }}>
                        <div style={addOpen ? { height: "100%", backgroundColor: "#27283C", transform: "calc(0.3s)", padding: "2%", boxSizing: "border-box", zIndex:"103" } : { width: "0%", transform: "calc(0.3s)" }} className={offStyle.addBox}>
                            <div>
                                <IoCloseCircle size={'20'} className={styleInd.btnCloseProduct} onClick={() => {
                                    setAddOpen(false)
                                }}></IoCloseCircle>
                                <div>
                                    <h3 className={styleInd.addProdText}>{lang.addOffer}</h3>
                                    <div className={styleInd.formImageBox}>
                                    <form onClick={(event:any) => event.target.querySelector(".input-files-offers")?.click()} className={styleInd.formImg}>
                                        <input type="file" accept="image/*" className="input-files-offers" hidden onChange={(e) => {
                                            var filesi = e.target.files
                                            if (filesi && filesi.length > 0) {
                                                const file = filesi[0]
                                                if(file instanceof File){
                                                    setImageProd(URL.createObjectURL(file));
                                                }
                                            }
                                        }}/><IoCloudUploadOutline color={"#fff"} size={30}/>
                                        </form>
                                        {imageProd ? <img src={imageProd} alt="photoProd" className={styleInd.imageAdd} /> : ''}
                                    </div>
                                </div>
                                <div>
                                    <h3 className={styleInd.addProdText}>{lang["add-offer-inf"]}</h3>
                                    <div className={styleInd.formTextBox}>
                                        <form>
                                            <div className={styleInd.formInpDiv}>
                                                <label className={styleInd.label} htmlFor="name">{lang.title}</label>
                                                <input type="text" placeholder={lang.title} value={addTitle} id="name" className={styleInd.inpAdd} onChange={(e) => {
                                                    setAddTitle(e.target.value)
                                                }} />
                                            </div>
                                            <div className={styleInd.formInpDiv}>
                                                <label className={styleInd.label} htmlFor="description">{lang.desciprt}</label>
                                                <input type="text" placeholder={lang.desciprt} value={addDescription} id="description" className={styleInd.inpAdd} onChange={(e) => {
                                                    setAddDescription(e.target.value);
                                                }} />
                                            </div>
                                        </form>
                                    </div>
                                    <div className={styleInd.btnBox}>
                                        <button onClick={() => {
                                            setAddTitle("")
                                            setAddDescription("")
                                            setImageProd("")
                                            setAddOpen(false)
                                        }} className={styleInd.cancelBtn}>{lang.cancel}</button>
                                        <button className={styleInd.createBtn} onClick={() => {
                                            axios.post("http://localhost:3000/api/offer", {
                                                name: addTitle,
                                                description: addDescription,
                                                img_url: imageProd
                                            }).then(res => {
                                                setAddTitle("");
                                                setAddDescription("");
                                                setImageProd("")
                                                setAddOpen(false)
                                            }).catch(err => {
                                                setError(err)
                                                setErrorOpen(true)
                                            })
                                        }}>{lang["create-offer"]}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className={offStyle.navFloatBox}>
                        <div>
                            <AdminFloatNav />
                        </div>
                        <div>
                            <AdminFootEaCamp />
                        </div>
                    </div>
                    <div className={offStyle.mainIndBox}>
                        <div className={offStyle.headerMainBoxOffer}>
                            <h3>Offers</h3>
                            <div>
                                <button onClick={() => {
                                    setAddOpen(true)
                                }}>+ {lang.addOffer}</button>
                            </div>
                        </div>
                        <div className={offStyle.listMainInd}>
                            <div className={offStyle.listHeadBox}>
                                <h3 style={{ width: "20%" }} className={offStyle.textHeadList}>ID</h3>
                                <h3 style={{ width: "20%" }} className={offStyle.textHeadList}>{lang.image}</h3>
                                <h3 style={{ width: "20%" }} className={offStyle.textHeadList}>{lang.title}</h3>
                                <h3 style={{ width: "20%" }} className={offStyle.textHeadList}>{lang.desciprt}</h3>
                                <h3 style={{ width: "20%" }} className={offStyle.textHeadList}>{lang.sil}</h3>
                            </div>
                            <div className={offStyle.mainListChild}>
                                {offersData.map((offer: any) => (
                                    <div className={offStyle.listMainBox}>
                                        <h3 style={{ width: "20%" }} className={offStyle.textHeadList}>{offer.id.split('').slice(0,5).join('')}...</h3>
                                        <div style={{ width: "20%" }}>
                                            <img className={offStyle.listImage} src={offer.img_url} alt="list_img" />
                                        </div>
                                        <h3 style={{ width: "20%" }}>{offer.name}</h3>
                                        <h3 style={{ width: "20%" }} className={offStyle.descriptionText}>{offer.description}</h3>
                                        <div style={{ width: "20%" }}>
                                            <button onClick={() => {
                                                setOfferID(offer.id)
                                                setTrashOpen(true)
                                            }} style={{background:"none", border:"none"}}><IoTrashOutline className={offStyle.deleteIo}/></button>
                                        </div>
                                        {trashOpen ? <section className={styleProd.trashBox}>
                                            <div className={styleProd.trashInd}>
                                                <h2 className={catStyle.deleteHeadText}>{lang["its-deleted"]}</h2>
                                                <div className={catStyle.textBoxDelete}>
                                                    <p>{lang["deleted-message"]}</p>
                                                </div>
                                                <div className={catStyle.deleteBtnBox}>
                                                    <button className={catStyle.cancelBtnDelete} onClick={() => {
                                                        setTrashOpen(false)
                                                    }}>{lang.cancel}</button>
                                                    <button className={catStyle.deleteBtnDelete} onClick={() => {
                                                        axios.delete(`http://localhost:3000/api/offer/${offerID}`)
                                                            .then(res => {
                                                                setTrashOpen(false)
                                                            }).catch(err => {
                                                                alert("Silinmedi")
                                                            })
                                                    }}>{lang.sil}</button>
                                                </div>
                                            </div>
                                        </section> : ''}
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