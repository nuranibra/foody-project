import Head from "next/head"
import NavBarAdmin from "../../../components/navbar/adminNav/navbar";
import styleProd from './products.module.css'
import AdminFloatNav from "../../../components/navbar/adminFloatNav/AdminFloatNav";
import AdminFootEaCamp from "../../../components/footer/adminFooter/adminEaCampFoot/AdminFootEaCamp";
import styleInd from './../index.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
import ProductBox from "../../../components/productsBox/ProductBox";
import catStyle from './../category/category.module.css'
import { useRouter } from "next/router";
import engLang from './../../../langJson/engJson.json';
import azeLang from './../../../langJson/azeJson.json';
import rusLang from './../../../langJson/rusJson.json';
import { IoCheckmarkCircleOutline, IoCloseCircle, IoCloseCircleOutline, IoCloudUploadOutline, IoHammerOutline, IoTrashOutline } from "react-icons/io5";

export default function Product () {

    const router = useRouter()
    const [category, setCategory] = useState([])
    const [searchCategory, setSearchCategory] = useState("")
    const [trashOpen, setTrashOpen] = useState(false)
    const [openHammer, setOpenHammer] = useState(false)
    const [imageUpdate, setImageUpdate] = useState(null)
    const [restData, setRestData] = useState([])
    const [nameUpdate, setNameUpdate] = useState("");
    const [descriptionUpdate, setDescriptionUpdate] = useState("");
    const [priceUpdate, setPriceUpdate] = useState(0);
    const [selectedRest, setSelectedRest] = useState("")
    const [fileName, setFileName] = useState("adsa");
    const [winOpen, setWinOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [deleteItem, setDeleteItem] = useState("");
    const [hummerData, setHummerData] = useState({});
    const [lang, setLang] = useState(engLang);

    useEffect(() => {
        if(!localStorage.getItem("access-token")){
            window.location.href = "/admin/login"
        }
      }, [])

    useEffect(() => {
        axios.get("http://localhost:3000/api/category")
            .then(res => {
                setCategory(res.data.result.data)
            }).catch(err => {
                alert(err)
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3000/api/restuarants')
        .then((res:any) => {
          setRestData(res.data.result.data)
        })
      }, [])

    const [product, setProduct] = useState([])
    const [restuarants, setRestuarants] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/products")
            .then(res => {
                setProduct(res.data.result.data)
            }).catch(err => {
                alert(err)
            })
    }, [trashOpen, openHammer, winOpen])

    useEffect(() => {
        axios.get("http://localhost:3000/api/restuarants")
            .then(res => {
                setRestuarants(res.data.result.data)
            }).catch(err => {
                alert(err)
            })
    }, [])

    useEffect(() => {
        if(router.locale == "en"){
            setLang(engLang)
        } else if (router.locale == "ru"){
            setLang(rusLang)
        } else if (router.locale == "az"){
            setLang(azeLang)
        }
    }, [router])

    return(
        <>
            <Head>
                <title>{lang.admin} | {lang.product}</title>
            </Head>
            <main className={styleProd.box} style={product.length >= 4 ? {height:"100%", boxSizing:"border-box", paddingBottom:"100%"} : {height:"100vh"}}>
                <header>
                    <NavBarAdmin />
                </header>
                <section className={styleProd.main}>
                    {winOpen ? <section style={{top:"0",left:"0",position:"absolute", zIndex: "5", width:"100%", height:"50px", display:"flex", justifyContent:"center"}}>
                        <div style={{backgroundColor:"#fff" , boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px", display:"flex", justifyContent:"space-around", alignItems:"center", borderRadius:"10px", marginTop:"1%"}} className={styleInd.messageBox}>
                        <IoCheckmarkCircleOutline style={{color:"#108800"}} size={30}/>
                        <h2 className={styleInd.completedText}>Progress Completed</h2>
                        </div>
                    </section> : ''}
                    {errorOpen ? <section style={{top:"0",left:"0",position:"absolute", zIndex: "5", width:"100%", height:"50px", display:"flex", justifyContent:"center"}}>
                    <div style={{backgroundColor:"#fff" , boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px", display:"flex", justifyContent:"space-around", alignItems:"center", borderRadius:"10px", marginTop:"1%"}} className={styleInd.messageBox}>
                        <IoCloseCircleOutline style={{color:"#860000"}} size={30}/>
                        <div>
                            <h2 className={styleInd.completedText}>Progress Failed</h2>
                        </div>
                        </div>
                    </section> : ''}
                    <div className={styleProd.navFloat}>
                        <AdminFloatNav />
                        <AdminFootEaCamp />
                    </div>
                    <div className={styleProd.mainDiv}>
                        <div className={styleProd.mainChild}>
                            <div className={styleProd.headerMain}>
                                <h2>{lang.product}</h2>
                                <div>
                                    <select style={{backgroundColor:"#2d2d42"}} className={styleInd.inpAdd} onChange={(e) => {
                                        setSearchCategory(e.target.value)
                                    }}>
                                        <option>{lang["rest-type"]}</option>
                                        {category.map((cate:any) => (
                                            <option value={cate.id}>{cate.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                            <section className={styleProd.prodBox}>
                                {product.map((item:any, index:number) => (
                                    <div className={styleProd.oneProd} key={index}>
                                        <section style={openHammer ? {display:"flex", backgroundColor:"rgba(0,0,0,0.635)"} : {display:"none"}}>
                                        <div className={styleInd.indBoxUpload}>
                                            <div>
                                            <IoCloseCircle size={'20'} className={styleInd.btnCloseProduct} onClick={() => {
                                                setOpenHammer(false)
                                                console.log(item.name)
                                            }}></IoCloseCircle>
                                            </div>
                                            <div className={styleInd.uploadBox}>
                                            <div className={styleInd.uploadBoxText}>
                                                <h3 className={styleInd.addProdText}>{lang["update-product"]}</h3>
                                            </div>
                                            <div className={styleInd.formImageBox}>
                                                <form onClick={() => document.querySelector(".input-file-update").click()} className={styleInd.formImg}>
                                                <input type="file" accept="image/*" className="input-file-update" hidden onChange={({target: {files}}) => {
                                                    files[0] && setFileName(files[0].name)
                                                    if(files){
                                                    setImageUpdate(URL.createObjectURL(files[0]));
                                                    }
                                                }}/><IoCloudUploadOutline color={"#fff"} size={30}/>
                                                </form><img src={imageUpdate ? imageUpdate : hummerData.img_url} alt="photo" className={styleInd.imageAdd}/>
                                            </div>
                                            </div>
                                            <div className={styleInd.addProdBox}>
                                            <div className={styleInd.uploadBoxText}>
                                                <h3 className={styleInd.addProdText}>{lang["add-your-product-information"]}</h3>
                                            </div>
                                            <div className={styleInd.formTextBox}>
                                                <form>
                                                    <div className={styleInd.formInpDiv}>
                                                    <label className={styleInd.label} htmlFor="name">{lang.name}</label>
                                                    <input type="text" placeholder={lang.name} value={nameUpdate.length < 1 ? hummerData.name : nameUpdate} id="name" className={styleInd.inpAdd} onChange={(e) => {
                                                        setNameUpdate(e.target.value)
                                                    }}/>
                                                    </div>
                                                    <div className={styleInd.formInpDiv}>
                                                    <label className={styleInd.label} htmlFor="description">{lang.desciprt}</label>
                                                    <input type="text" placeholder={lang.desciprt} value={descriptionUpdate.length < 1 ? hummerData.description : descriptionUpdate} id="description" className={styleInd.inpAdd} onChange={(e) => {
                                                        setDescriptionUpdate(e.target.value);
                                                    }}/>
                                                    </div>
                                                    <div className={styleInd.formInpDiv}>
                                                    <label className={styleInd.label} htmlFor="price">{lang.price}</label>
                                                    <input type="number" placeholder={lang.price} value={priceUpdate < 1 ? hummerData.price : priceUpdate} id="price" className={styleInd.inpAdd} onChange={(e:any) => {
                                                        setPriceUpdate(e.target.value);
                                                    }}/>
                                                    </div>
                                                    <div className={styleInd.formInpDiv}>
                                                    <label className={styleInd.label} htmlFor="restaurant">{lang.restaurant}</label>
                                                    <select id="restaurant" onChange={(e) => {
                                                        setSelectedRest(e.target.value)
                                                    }} className={styleInd.inpAdd}>
                                                        <option>{lang.chooseRest}</option>
                                                        {restData.map((data:any,index:number) => (
                                                        <option key={index} value={data.name}>{data.name}</option>
                                                        ))}
                                                    </select>
                                                    </div>
                                                </form>
                                            </div>
                                            </div>
                                            <div className={styleInd.btnBox}>
                                            <div className={styleInd.btnChildBoxCancel}>
                                                <button className={styleInd.cancelBtn} onClick={() => {
                                                setNameUpdate("");
                                                setDescriptionUpdate("");
                                                setImageUpdate(null);
                                                setPriceUpdate(0);
                                                setOpenHammer(false)
                                                }}>{lang.cancel}</button>
                                            </div>
                                            <div className={styleInd.btnChildBoxCreate}>
                                                <button className={styleInd.createBtn} onClick={() => {
                                                    axios.post("http://localhost:3000/api/products", {
                                                    name:nameUpdate.length < 1 ? item.name : nameUpdate,
                                                    description:descriptionUpdate.length < 1 ? item.description : descriptionUpdate,
                                                    img_url: imageUpdate ? imageUpdate : item.img_url,
                                                    price:priceUpdate < 1 ? item.price : priceUpdate
                                                    }).then(function (res) {
                                                    setWinOpen(true)
                                                    }).catch(function (error) {
                                                    setErrorOpen(true)
                                                    })
                                                }}>{lang["create-project"]}</button>
                                            </div>
                                            </div>
                                        </div>
                                        </section>
                                        <section className={styleProd.trashBox} style={trashOpen ? {display:"flex"} : {display:"none"}}>
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
                                                            console.log(item.name)
                                                            axios.delete(`http://localhost:3000/api/products/${deleteItem}`)
                                                                .then(res => {
                                                                    setTrashOpen(false)
                                                                }).catch(err => {
                                                                    setErrorOpen(true)
                                                                })
                                                        }}>{lang.sil}</button>
                                                    </div>
                                            </div>
                                        </section>
                                        <div>
                                            <img src={item.img_url} alt="img_url" className={styleProd.imageProdOne}/>
                                        </div>
                                        <div>
                                            <h2 className={styleProd.nameProdOne}>{item.name}</h2>
                                            <div>{restuarants.filter((rest:any) => {
                                                return(rest.id === item.rest_id)
                                            }).map((prod:any) => (
                                                <h3 className={styleProd.restNameProdOne}>{prod.name}</h3>
                                            ))}</div>
                                        </div>
                                        <div style={{display:"flex", width:"100%", justifyContent:"space-between"}}>
                                            <h4 className={styleProd.priceOne}>{`${item.price}$`}</h4>
                                            <div>
                                                <button style={{background:"none", border:"none", cursor:"pointer"}} onClick={() => {
                                                    setDeleteItem(item.id)
                                                    console.log(item.name)
                                                    // axios.delete(`http://localhost:3000/api/products/${item.id}`)
                                                    //             .then(res => {
                                                    //                 setTrashOpen(false)
                                                    //             }).catch(err => {
                                                    //                 alert("Silinmedi")
                                                    //             })
                                                    setTrashOpen(true)
                                                }}><IoTrashOutline size={20} color="red"/></button>
                                                <button style={{background:"none", border:"none", cursor:"pointer"}} onClick={() => {
                                                    setHummerData(item)
                                                    setOpenHammer(true)
                                                }}><IoHammerOutline size={20}/></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </section>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}