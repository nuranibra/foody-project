import Head from "next/head";
import NavBarAdmin from "../../../components/navbar/adminNav/navbar";
import restStyle from './restaurant.module.css'
import AdminFloatNav from "../../../components/navbar/adminFloatNav/AdminFloatNav";
import AdminFootEaCamp from "../../../components/footer/adminFooter/adminEaCampFoot/AdminFootEaCamp";
import axios from "axios";
import styleInd from './../index.module.css'
import { useCallback, useEffect, useState } from "react";
import catStyle from './../category/category.module.css'
import FormImg from "../../../components/formImage/formImage";
import styleProd from './../products/products.module.css'
import { IoCheckmarkCircleOutline, IoCloseCircle, IoCloseCircleOutline, IoCloudUploadOutline, IoHammerOutline, IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import engLang from './../../../langJson/engJson.json';
import azeLang from './../../../langJson/azeJson.json';
import rusLang from './../../../langJson/rusJson.json';

export default function Restaurants () {
    
    const router = useRouter();
    const [data,setData] = useState([]);
    const [openRest, setOpenRest] = useState(false);
    const [category, setCategory] = useState([]);
    const [name,setName] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [deliveryMin, setDeliveryMin] = useState(1);
    const [address, setAddress] = useState("");
    const [categoryInp, setCategoryInp] = useState("");
    const [fileName, setFileName] = useState("Not choose image");
    const [imageProd, setImageProd] = useState(null);
    const [categoryData, setCategoryData] = useState([]);
    const [trashOpen, setTrashOpen] = useState(false);
    const [hammerOpen, setHammerOpen] = useState(false);
    const [updateName, setUpdateName] = useState("");
    const [imageUpdate, setImageUpdata] = useState(null);
    const [cuisineUpdate, setCuisineUpdate] = useState("");
    const [deliveryPriceUpdate,setDeliveryPriceUpdate] = useState(0);
    const [deliveryMinUpdate, setDeliveryMinUpdate] = useState(1);
    const [addressUpdate, setAddressUpdate] = useState("");
    const [trashId,setTrashId] = useState("");
    const [winOpen,setWinOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [hummerId,setHummerId] = useState({});
    const [lang, setLang] = useState(engLang);


    function handleChange (e:any) {
        setCategoryInp(e.target.value)
    }

    useEffect(() => {
        if(!localStorage.getItem("access-token")){
            window.location.href = "/admin/login"
        }
      }, [])

    useEffect(() => {
        axios.get("http://localhost:3000/api/restuarants")
        .then(res => {
            setData(res.data.result.data)
        }).catch(error => {
            alert("hata oldu")
        })
    }, [trashOpen, openRest])

    useEffect(() => {
        axios.get("http://localhost:3000/api/category")
            .then(res => {
                setCategory(res.data.result.data)
            }).catch(error => {
                alert("categoryde hata oldu")
            })
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
        if(!localStorage.getItem("access-token")){
            window.location.href = "/admin/login"
        }
      }, [])


    return(
        <>
            <Head>
                <title>{lang.admin} | {lang.restaurant}</title>
            </Head>
            <section className={restStyle.box}>
                <header>
                    <NavBarAdmin />
                </header>
                {winOpen ? <section style={{top:"0",left:"0",position:"absolute", zIndex: "2", width:"100%", height:"50px", display:"flex", justifyContent:"center"}}>
                    <div style={{backgroundColor:"#fff" , boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px", display:"flex", justifyContent:"space-around", alignItems:"center", borderRadius:"10px", marginTop:"1%"}} className={styleInd.messageBox}>
                    <IoCheckmarkCircleOutline style={{color:"#108800"}} size={30}/>
                    <h2 className={styleInd.completedText}>Progress Completed</h2>
                    </div>
                </section> : ''}
                {errorOpen ? <section style={{top:"0",left:"0",position:"absolute", zIndex: "2", width:"100%", height:"50px", display:"flex", justifyContent:"center"}}>
                <div style={{backgroundColor:"#fff" , boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px", display:"flex", justifyContent:"space-around", alignItems:"center", borderRadius:"10px", marginTop:"1%"}} className={styleInd.messageBox}>
                    <IoCloseCircleOutline style={{color:"#860000"}} size={30}/>
                    <div>
                        <h2 className={styleInd.completedText}>Progress Failed</h2>
                    </div>
                    </div>
                </section> : ''}
                {openRest ? <section className={restStyle.openRest}>
                    <div className={restStyle.openRestInd}>
                        <div>
                        <IoCloseCircle size={'20'} className={styleInd.btnCloseProduct} onClick={() => {
                            setOpenRest(false)
                        }}></IoCloseCircle>
                        </div>
                        <div className={restStyle.addRestChild}>
                            <div>
                                <h2 style={{fontSize:"25px"}} className={restStyle.addText}>{lang.addRest}</h2>
                                <h3 style={{fontSize:"18px"}} className={restStyle.imageUploadText}>{lang["product-upload-image-text"]}</h3>
                            </div>
                            <div>
                                <div className={styleInd.formImageBox}>
                                    <form onClick={() => document.querySelector(".input-files").click()} className={styleInd.formImg}>
                                    <input type="file" accept="image/*" className="input-files" hidden onChange={(e) => {
                                        var filesi = e.target.files;
                                        filesi[0] && setFileName(filesi[0].name)
                                        if(filesi){
                                        setImageProd(URL.createObjectURL(filesi[0]));
                                        }
                                    }}/><IoCloudUploadOutline color={"#fff"} size={30}/>
                                    </form>
                                    {imageProd ? <img src={imageProd} alt="photoProd" className={styleInd.imageAdd}/> : ''}
                                </div>
                            </div>
                        </div>
                        <div className={restStyle.addRestChild}>
                            <div>
                                <h3 style={{fontSize:"20px"}} className={restStyle.imageUploadText}>{lang["add-rest-information"]}</h3>
                            </div>
                            <div className={styleInd.formTextBox}>
                                <form>
                                    <div className={styleInd.formInpDiv}>
                                        <label htmlFor="name" className={styleInd.label}>{lang.name}</label>
                                        <input type="text" onChange={(e) => {
                                            setName(e.target.value);
                                        }} placeholder={lang.name} value={name} id="name" className={styleInd.inpAdd}/>
                                    </div>
                                    <div className={styleInd.formInpDiv}>
                                        <label htmlFor="cuisine" className={styleInd.label}>{lang.cuisine}</label>
                                        <input onChange={(e) => {
                                            setCuisine(e.target.value)
                                        }} type="text" value={cuisine} placeholder={lang.cuisine} id="cuisine" className={styleInd.inpAdd}/>
                                    </div>
                                    <div className={styleInd.formInpDiv}>
                                        <label htmlFor="deliveryPrice" className={styleInd.label}>{lang["delivery-price"]} $</label>
                                        <input type="number" onChange={(e) => {
                                            setDeliveryPrice(Number(e.target.value));
                                        }} value={deliveryPrice} placeholder={lang["delivery-price"]} id="deliveryPrice" className={styleInd.inpAdd}/>
                                    </div>
                                    <div className={styleInd.formInpDiv}>
                                        <label htmlFor="delivery_min" className={styleInd.label}>{lang["delivery-min"]}</label>
                                        <input type="number" onChange={(e:any) => {
                                            if(e.target.value <= 0){
                                                setDeliveryMin(1)
                                            } else if (e.target.value >= 15){
                                                setDeliveryMin(15)
                                            } else {
                                                setDeliveryMin(e.target.value)
                                            }
                                        }} value={deliveryMin} placeholder={lang["delivery-min"]} id="delivery_min" className={styleInd.inpAdd}/>
                                    </div>
                                    <div className={styleInd.formInpDiv}>
                                        <label htmlFor="address" className={styleInd.label}>{lang.address}</label>
                                        <input type="text" onChange={(e) => {
                                            setAddress(e.target.value);
                                        }} value={address} placeholder={lang.address} id="address" className={styleInd.inpAdd}/>
                                    </div>
                                    <div className={styleInd.formInpDiv}>
                                        <label htmlFor="category" className={styleInd.label}>{lang["category-head"]}</label>
                                        <select id="category" value={categoryInp} onChange={handleChange} className={styleInd.inpAdd}>
                                            <option>{lang.chooCate}</option>
                                            {category.map((item:any,index:number) => (
                                                <option key={index} value={item.id} >{item.name}</option>
                                            ))}
                                        </select>
                                        <p>{categoryInp}</p>
                                    </div>
                                </form>
                            </div>
                            <div className={restStyle.btnOpenBox} style={{marginTop:"2%"}}>
                                <button type="button" className={styleInd.cancelBtn} onClick={() => {
                                    setName("");
                                    setCuisine("");
                                    setDeliveryMin(1);
                                    setDeliveryPrice(0);
                                    setImageProd(null);
                                    setOpenRest(false)
                                }}>{lang.cancel}</button>
                                <button type="submit" className={styleInd.createBtn} onClick={() => {
                                    console.log([name, categoryInp,imageProd,cuisine,address,deliveryMin,deliveryPrice])
                                    axios.post("http://localhost:3000/api/restuarants", {
                                        name,
                                        category_id:categoryInp,
                                        img_url:imageProd,
                                        cuisine,
                                        address,
                                        delivery_min:deliveryMin,
                                        delivery_price:deliveryPrice
                                    }).then(res => {
                                        alert("Ugurlu")
                                    }).catch(err => {
                                        alert(err)
                                    })
                                }}>{lang["create-rest"]}</button>
                            </div>
                        </div>
                    </div>
                </section> : ''}
                <div className={restStyle.childBox}>
                    <div className={restStyle.navDiv}>
                        <div className={styleInd.navBoxInd}>
                            <AdminFloatNav/>
                        </div>
                        <div className={styleInd.eacampFooter}>
                            <AdminFootEaCamp />
                        </div>
                    </div>
                    <div className={restStyle.main}>
                        <div className={restStyle.headerMain}>
                            <div>
                                <h2 className={restStyle.restText}>{lang.restaurant}</h2>
                            </div>
                            <div className={restStyle.btnRestDiv}>
                                <div>
                                    <select className={restStyle.selectBtn}>
                                        <option onChange={(e) => {

                                        }}>{lang.chooCate}</option>
                                        {category.map((item:any, index:number) => (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <button className={restStyle.btnRest} onClick={() => {
                                        setOpenRest(true)
                                    }}>+ {lang.addRest}</button>
                                </div>
                            </div>
                        </div>
                        <div className={restStyle.mainBox} style={data.length >= 1 ? {columnGap:"10px", flexWrap:"wrap",flexDirection:"row", padding:"1%", boxSizing:"border-box"} : {justifyContent:"center", alignItems:"center"}}>
                            {data.length >= 1 ? data.map((rest:any) => (
                                <div className={restStyle.oneRest}>
                                    {trashOpen ? <section style={{width:"100%" , height:"100%", backgroundColor:"rgba(0,0,0,0.635)", position:"absolute", top:"0", left:"0", display:"flex", justifyContent:"center", alignItems:"center"}}>
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
                                                            axios.delete(`http://localhost:3000/api/restuarants/${trashId}`)
                                                                .then(res => {
                                                                    setTrashOpen(false)
                                                                }).catch(err => {
                                                                    setErrorOpen(true)
                                                                })
                                                        }}>{lang.sil}</button>
                                                    </div>
                                                </div>
                                    </section> : ''}
                                    <section style={hammerOpen ? {top:"0", left:"0",display:"flex", backgroundColor:"rgba(0,0,0,0.635)", width:"100%", height:"100%", position:"absolute", justifyContent:"flex-end"} : {display:"none"}}>
                                        <div className={restStyle.openRestInd}>
                                                <div>
                                                <IoCloseCircle size={'20'} className={styleInd.btnCloseProduct} onClick={() => {
                                                    setHammerOpen(false)
                                                }}></IoCloseCircle>
                                                </div>
                                                <div className={restStyle.addRestChild}>
                                                    <div>
                                                        <h2 style={{fontSize:"25px"}} className={restStyle.addText}>{lang["update-product"]}</h2>
                                                        <h3 style={{fontSize:"18px"}} className={restStyle.imageUploadText}>{lang["update-image"]}</h3>
                                                    </div>
                                                    <div>
                                                        <div className={styleInd.formImageBox}>
                                                            <form onClick={() => document.querySelector(".input-files-update").click()} className={styleInd.formImg}>
                                                            <input type="file" accept="image/*" className="input-files-update" hidden onChange={(e) => {
                                                                var filesil = e.target.files;
                                                                filesil[0] && setFileName(filesil[0].name)
                                                                if(filesil){
                                                                    setImageUpdata(URL.createObjectURL(filesil[0]));
                                                                }
                                                            }}/><IoCloudUploadOutline color={"#fff"} size={30}/>
                                                            </form>
                                                            <img src={imageUpdate ? imageUpdate : hummerId.img_url} alt="photoUpdate" className={styleInd.imageAdd}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={restStyle.addRestChild}>
                                                    <div>
                                                        <h3 style={{fontSize:"20px"}} className={restStyle.imageUploadText}>{lang["rest-update"]}</h3>
                                                    </div>
                                                    <div className={styleInd.formTextBox}>
                                                        <form>
                                                            <div className={styleInd.formInpDiv}>
                                                                <label htmlFor="name" className={styleInd.label}>{lang.name}</label>
                                                                <input type="text" onChange={(e) => {
                                                                    setUpdateName(e.target.value);
                                                                }} placeholder={lang.name} value={updateName.length < 0 ? hummer.name : updateName} id="name" className={styleInd.inpAdd}/>
                                                            </div>
                                                            <div className={styleInd.formInpDiv}>
                                                                <label htmlFor="cuisine" className={styleInd.label}>{lang.cuisine}</label>
                                                                <input onChange={(e) => {
                                                                    setCuisineUpdate(e.target.value)
                                                                }} type="text" value={cuisineUpdate.length < 0 ? hummerId.cuisine : cuisineUpdate} placeholder={lang.cuisine} id="cuisine" className={styleInd.inpAdd}/>
                                                            </div>
                                                            <div className={styleInd.formInpDiv}>
                                                                <label htmlFor="deliveryPrice" className={styleInd.label}>{lang["delivery-price"]} $</label>
                                                                <input type="number" onChange={(e) => {
                                                                    setDeliveryPriceUpdate(Number(e.target.value));
                                                                }} value={deliveryPriceUpdate < 0 ? hummerId.delivery_price : deliveryPriceUpdate} placeholder={lang["delivery-price"]} id="deliveryPrice" className={styleInd.inpAdd}/>
                                                            </div>
                                                            <div className={styleInd.formInpDiv}>
                                                                <label htmlFor="delivery_min" className={styleInd.label}>{lang["delivery-min"]}</label>
                                                                <input type="number" onChange={(e:any) => {
                                                                    if(e.target.value <= 0){
                                                                        setDeliveryMinUpdate(1)
                                                                    } else if (e.target.value >= 15){
                                                                        setDeliveryMinUpdate(15)
                                                                    } else {
                                                                        setDeliveryMinUpdate(e.target.value)
                                                                    }
                                                                }} value={deliveryMinUpdate < 2 ? hummerId.delivery_min : deliveryMinUpdate} placeholder={lang["delivery-min"]} id="delivery_min" className={styleInd.inpAdd}/>
                                                            </div>
                                                            <div className={styleInd.formInpDiv}>
                                                                <label htmlFor="address" className={styleInd.label}>{lang.address}</label>
                                                                <input type="text" onChange={(e) => {
                                                                    setAddressUpdate(e.target.value);
                                                                }} value={addressUpdate.length < 1 ? hummerId.address : addressUpdate} placeholder={lang.address} id="address" className={styleInd.inpAdd}/>
                                                            </div>
                                                            <div className={styleInd.formInpDiv}>
                                                                <label htmlFor="category" className={styleInd.label}>{lang["category-nav"]}</label>
                                                                <select id="category" value={categoryInp} onChange={handleChange} className={styleInd.inpAdd}>
                                                                    <option>{lang.chooCate}</option>
                                                                    {category.map((item:any,index:number) => (
                                                                        <option key={index} value={item.id} >{item.name}</option>
                                                                    ))}
                                                                </select>
                                                                <p>{categoryInp}</p>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className={restStyle.btnOpenBox} style={{marginTop:"2%"}}>
                                                        <button type="button" className={styleInd.cancelBtn} onClick={() => {
                                                            setUpdateName("");
                                                            setCuisineUpdate("");
                                                            setDeliveryMinUpdate(1);
                                                            setDeliveryPriceUpdate(0);
                                                            setImageUpdata(null);
                                                            setHammerOpen(false);
                                                        }}>{lang.cancel}</button>
                                                        <button type="submit" className={styleInd.createBtn} onClick={() => {
                                                            console.log(rest.id)
                                                            axios.put(`http://localhost:3000/api/restuarants/${hummerId.id}`, {
                                                                name:updateName.length < 1 ? hummerId.name : updateName,
                                                                category_id:categoryInp,
                                                                img_url:imageUpdate ? imageUpdate : hummerId.img_url,
                                                                cuisine:cuisineUpdate.length < 1 ? hummerId.cuisine : cuisineUpdate,
                                                                address:addressUpdate.length < 1 ? hummerId.address : addressUpdate,
                                                                delivery_min:deliveryMinUpdate == hummerId.delivery_min ? hummerId.delivery_min : deliveryMinUpdate,
                                                                delivery_price:deliveryPriceUpdate == hummerId.delivery_price ? hummerId.delivery_price : deliveryPriceUpdate
                                                            }).then(res => {
                                                                setWinOpen(true)
                                                            }).catch(err => {
                                                                setErrorOpen(true)
                                                            })
                                                        }}>{lang["rest-update"]}</button>
                                                    </div>
                                                </div>
                                            </div>
                                    </section>
                                        <div style={{display:"flex", alignItems:"center"}}>
                                            <img src={rest.img_url} alt="rest_img" className={restStyle.restImage}/>
                                        </div>
                                        <div className={restStyle.textOneRest}>
                                            <div>
                                                <h2 className={restStyle.restName}>{rest.name}</h2>
                                                <div>{category.filter((item:any) => item.id === rest.category_id).map((oneitem:any) => {
                                                    return(
                                                        <h3 className={restStyle.categoryRest}>{oneitem.name}</h3>
                                                    );
                                                })}</div>
                                            </div>
                                            <div className={restStyle.btnBoxRest}>
                                                <button className={restStyle.renameBtn} onClick={() => {
                                                    setHummerId(rest)
                                                    setHammerOpen(true)
                                                }}><IoHammerOutline size={30}/></button>
                                                <button className={restStyle.btnDelete} onClick={() => {
                                                    setTrashId(rest.id)
                                                    setTrashOpen(true)
                                                }}><IoTrashOutline size={30} color="red"/></button>
                                            </div>
                                        </div>
                                </div>
                            )) : <h2 className={restStyle.notFoundMessage}>{lang["rest-not-found"]}</h2>}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}