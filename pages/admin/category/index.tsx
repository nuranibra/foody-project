import Head from "next/head";
import NavBarAdmin from "../../../components/navbar/adminNav/navbar";
import AdminFloatNav from "../../../components/navbar/adminFloatNav/AdminFloatNav";
import AdminFootEaCamp from "../../../components/footer/adminFooter/adminEaCampFoot/AdminFootEaCamp";
import catStyle from './category.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { IoAlertCircleOutline, IoCheckmarkCircleOutline, IoCloseCircle, IoCloseCircleOutline, IoCloseOutline, IoCloudUploadOutline, IoHammerOutline, IoTrashOutline } from "react-icons/io5";
import styleInd from './../index.module.css'
import CategoryBox from "../../../components/categoryBox/CategoryBox";
import engLang from './../../../langJson/engJson.json';
import azeLang from './../../../langJson/azeJson.json';
import rusLang from './../../../langJson/rusJson.json';
import { useRouter } from "next/router";

export default function Categoy () {

    const router = useRouter();
    const [categoryData, setCategoryData] = useState([])
    const [openCategory, setOpenCategory] = useState(false);
    const [imageProd, setImageProd] = useState("");
    const [nameCategory, setNameCategory] = useState("");
    const [slugCategory, setSlugCategory] = useState("");
    const [win, setWin] = useState(false);
    const [failed, setFailed] = useState(false)
    const [openTrash, setOpenTrash] = useState(false)
    const [lang, setLang] = useState(engLang);
    const [openHammer, setOpenHammer] = useState(false);
    const [imgUpdate, setImgUpdate] = useState("");
    const [titleUpdate, setTitleUpdate] = useState("");
    const [descriptionUpdate, setDescriptionUpdate] = useState("");
    const [hummerId, setHummerId] = useState("");
    const [hummerImg, setHummerImg] = useState("");

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
        axios.get("https://foody-project-green.vercel.app/api/category").then(res => {
            setCategoryData(res.data.result.data)
        }).catch(err => alert(err))
    }, [openCategory, openTrash, openHammer])

    useEffect(() => {
        const interval = setInterval(() => {
            if(win){
                setWin(false)
            } else if (failed) {
                setFailed(false)
            }
        }, 3000)

        return () => clearInterval(interval)
    }, [win, failed])

    return(
        <>
            <Head>
                <title>{lang.admin} | {lang["category-nav"]}</title>
            </Head>
            <section className={catStyle.box}>
                {win ? <section style={{zIndex:"2",position:"absolute", width:"100%",top:"0", left:"0", display:"flex", justifyContent:"center"}}>
                <div style={{backgroundColor:"#fff" , boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px", display:"flex", justifyContent:"space-around", alignItems:"center", borderRadius:"10px", marginTop:"1%"}} className={styleInd.messageBox}>
                    <IoCheckmarkCircleOutline style={{color:"#108800"}} size={30}/>
                    <h2 className={styleInd.completedText}>Progress Completed</h2>
                </div>
                </section> : ''}
                {failed ? <section style={{zIndex:"2",position:"absolute", width:"100%",top:"0", left:"0", display:"flex", justifyContent:"center"}}>
                <div style={{backgroundColor:"#fff" , boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px", display:"flex", justifyContent:"space-around", alignItems:"center", borderRadius:"10px", marginTop:"1%"}} className={styleInd.messageBox}>
                    <IoCloseCircleOutline style={{color:"#860000"}} size={30}/>
                    <h2 className={styleInd.completedText}>Progress Failed</h2>
                </div>
                </section> : ''}
                {openHammer ? <section className={catStyle.hammerBox}>
                    <div className={catStyle.hammerInd}>
                        <div>
                            <button type="button" className={catStyle.closeButton} onClick={() => {
                                setOpenHammer(false)
                            }}>
                                <IoCloseCircle size={20} className={styleInd.btnCloseProduct}/>
                            </button>
                        </div>
                        <div>
                        <div>
                                <div>
                                    <h3 className={catStyle.textCategory} style={{fontSize:"25px"}}>{lang["edit-offer"]}</h3>
                                    <h4 className={catStyle.textCategory}>{lang["upload-image"]}</h4>
                                </div>
                                <div>
                                    <div className={styleInd.formImageBox}>
                                    <form onClick={(event:any) => event.target.querySelector(".input-files-category-update")?.click()} className={styleInd.formImg}>
                                        <input type="file" accept="image/*" className="input-files-category-update" hidden onChange={(e) => {
                                            var filesi = e.target.files
                                            if (filesi && filesi.length > 0) {
                                                const file = filesi[0]
                                                if(file instanceof File){
                                                    setImgUpdate(URL.createObjectURL(file));
                                                }
                                            }
                                        }}/><IoCloudUploadOutline color={"#fff"} size={30}/>
                                        </form>
                                        <img src={imgUpdate ? imgUpdate : hummerImg} alt="photoProd" className={styleInd.imageAdd}/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4 className={catStyle.textCategory}>{lang["edit-offer-inf"]}</h4>
                                </div>
                                <div className={styleInd.formTextBox}>
                                    <form>
                                        <div className={styleInd.formInpDiv}>
                                            <label htmlFor="namea" className={styleInd.label}>{lang.title}</label>
                                            <input type="text" onChange={(event) => {
                                                setTitleUpdate(event.target.value)
                                            }} className={styleInd.inpAdd} placeholder={lang.title} id="namea"/>
                                        </div>
                                        <div className={styleInd.formInpDiv}>
                                            <label htmlFor="sluga" className={styleInd.label}>{lang.desciprt}</label>
                                            <input type="text" onChange={(e) => {
                                                setDescriptionUpdate(e.target.value);
                                            }} className={styleInd.inpAdd} placeholder={lang.desciprt} id="sluga"/>
                                        </div>
                                    </form>
                                </div>
                                <div className={catStyle.btnBox}>
                                    <button className={catStyle.cancelBtn} onClick={() => {
                                        setTitleUpdate("")
                                        setDescriptionUpdate("")
                                        setImgUpdate("")
                                        setOpenHammer(false)
                                    }}>{lang.cancel}</button>
                                    <button className={catStyle.createBtn} onClick={() => {
                                        axios.put(`https://foody-project-green.vercel.app/api/category/${hummerId}`, {
                                            name:titleUpdate,
                                            slug:descriptionUpdate,
                                            img_url:imgUpdate
                                        }).then(res => {
                                            setOpenHammer(false)
                                            setWin(true)
                                        })
                                        .catch(error => {
                                            setFailed(true)
                                        })
                                    }}>{lang["create-category"]}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> : ""}
                {openCategory ? <section className={catStyle.addMainBox}>
                    <div className={catStyle.addMainInd}>
                        <div>
                            <IoCloseCircle size={20} className={catStyle.closeIcon} onClick={() => {
                                setOpenCategory(false)
                            }}/>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <h3 className={catStyle.textCategory} style={{fontSize:"25px"}}>{lang["add-category"]}</h3>
                                    <h4 className={catStyle.textCategory}>{lang["upload-image"]}</h4>
                                </div>
                                <div>
                                    <div className={styleInd.formImageBox}>
                                    <form onClick={(event:any) => event.target.querySelector(".input-files-category")?.click()} className={styleInd.formImg}>
                                        <input type="file" accept="image/*" className="input-files-category" hidden onChange={(e) => {
                                            var filesi = e.target.files
                                            if (filesi && filesi.length > 0) {
                                                const file = filesi[0]
                                                if(file instanceof File){
                                                    setImageProd(URL.createObjectURL(file));
                                                }
                                            }
                                        }}/><IoCloudUploadOutline color={"#fff"} size={30}/>
                                        </form>
                                        {imageProd ? <img src={imageProd} alt="photoProd" className={styleInd.imageAdd}/> : ''}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4 className={catStyle.textCategory}>{}</h4>
                                </div>
                                <div className={styleInd.formTextBox}>
                                    <form>
                                        <div className={styleInd.formInpDiv}>
                                            <label htmlFor="name" className={styleInd.label}>{lang.name}</label>
                                            <input type="text" onChange={(e) => {
                                                setNameCategory(e.target.value)
                                            }} className={styleInd.inpAdd} placeholder={lang.name} id="name"/>
                                        </div>
                                        <div className={styleInd.formInpDiv}>
                                            <label htmlFor="slug" className={styleInd.label}>{lang.slug}</label>
                                            <input type="text" onChange={(e) => {
                                                setSlugCategory(e.target.value);
                                            }} className={styleInd.inpAdd} placeholder={lang.slug} id="slug"/>
                                        </div>
                                    </form>
                                </div>
                                <div className={catStyle.btnBox}>
                                    <button className={catStyle.cancelBtn} onClick={() => {
                                        setNameCategory("")
                                        setSlugCategory("")
                                        setImageProd("")
                                        setOpenCategory(false)
                                    }}>{lang.cancel}</button>
                                    <button className={catStyle.createBtn} onClick={() => {
                                        axios.post("https://foody-project-green.vercel.app/api/category", {
                                            name:nameCategory,
                                            slug:slugCategory,
                                            img_url:imageProd
                                        }).then(res => {
                                            setOpenCategory(false)
                                            setWin(true)
                                        })
                                        .catch(error => {
                                            setFailed(true)
                                        })
                                    }}>{lang["create-category"]}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> : ''}
                <header>
                    <NavBarAdmin />
                </header>
                <div className={catStyle.mainBox}>
                    <div className={catStyle.floatNavBox}>
                        <div>
                            <AdminFloatNav />
                        </div>
                        <div>
                            <AdminFootEaCamp />
                        </div>
                    </div>
                    <div className={catStyle.mainContainer}>
                        <div className={catStyle.headerMain}>
                            <h2>Category</h2>
                            <div>
                                <button className={catStyle.addBtn} onClick={() => {
                                    setOpenCategory(true)
                                }}>+ {lang["add-category"]}</button>
                            </div>
                        </div>
                        <div className={catStyle.main}>
                            <div className={catStyle.mainChild}>
                                <div className={catStyle.headTable}>
                                    <h2 style={{width:"20%"}}>ID</h2>
                                    <h2 style={{width:"20%"}}>{lang.image}</h2>
                                    <h2 style={{width:"20%"}}>{lang.name}</h2>
                                    <h2 style={{width:"20%"}}>{lang.slug}</h2>
                                </div>
                                {categoryData.length >= 1 ? categoryData.map((item:any,index:number) => (
                                    <div key={index} className={catStyle.oneStyle} style={{display:"flex",alignItems:"center", justifyContent:"space-between", width:"100%"}}>
                                        <h3 style={{width:"20%", position:"relative"}}>{(item.id.split("").slice(0,5).join(''))}</h3>
                                        <div style={{width:"20%"}}><img src={item.img_url} alt="image" className={catStyle.listImg}/></div>
                                        <h3 style={{width:"20%"}}>{item.name}</h3>
                                        <h3 style={{width:"20%"}}>{item.slug}</h3>
                                        <div style={{display:"flex", width:"20%", alignItems:"center"}}>
                                            <button style={{background:"none", border:"none"}}><IoTrashOutline color="red" style={{cursor:"pointer"}} className={catStyle.ioBtn} onClick={() => {
                                                setHummerId(item.id)
                                                setOpenTrash(true)
                                            }}/></button>
                                            <button style={{background:"none", border:"none"}} onClick={() => {
                                                setHummerImg(item.img_url)
                                                setOpenHammer(true)
                                            }}><IoHammerOutline  style={{cursor:"pointer"}} className={catStyle.ioBtn}/></button>
                                        </div>
                                        <section style={openTrash ? {display:"flex",justifyContent:"center",alignItems:"center",boxSizing:"border-box",top:"0",left:"0",position:"absolute", width:"100%", height:"100%", background:"rgba(0, 0, 0, 0.635)"} : {display:"none"}}>
                                            <div style={{backgroundColor:"#fff"}} className={catStyle.deleteBox}>
                                                <h2 className={catStyle.deleteHeadText}>{lang["its-deleted"]}</h2>
                                                <div className={catStyle.textBoxDelete}>
                                                    <p>{lang["deleted-message"]}</p>
                                                </div>
                                                <div className={catStyle.deleteBtnBox}>
                                                    <button className={catStyle.cancelBtnDelete} onClick={() => {
                                                        setOpenTrash(false)
                                                    }}>{lang.cancel}</button>
                                                    <button className={catStyle.deleteBtnDelete} onClick={() => {
                                                        axios.delete(`https://foody-project-green.vercel.app/api/category/${hummerId}`)
                                                            .then(res => {
                                                                setOpenTrash(false)
                                                            }).catch(err => {
                                                                alert("Silinmedi")
                                                            })
                                                    }}>{lang.sil}</button>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                )) : <h2 className={catStyle.notFoundMessage}>
                                    <IoAlertCircleOutline size={30}/>
                                    {lang["category-not-found"]}
                                </h2>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}