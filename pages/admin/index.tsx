import type { NextPage } from "next";
import Head from "next/head";
import styleInd from "./index.module.css";
import NavBarAdmin from "../../components/navbar/adminNav/navbar";
import navStyle from './../../components/navbar/adminNav/navbar.module.css';
import Logo from "../../components/logo/logo";
import Link from "next/link";
import AdminFloatNav from "../../components/navbar/adminFloatNav/AdminFloatNav";
import AdminFootEaCamp from "../../components/footer/adminFooter/adminEaCampFoot/AdminFootEaCamp";
import { Doughnut, Line } from "react-chartjs-2";
import 'chart.js/auto'
import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import rusLang from "./../../langJson/rusJson.json";
import azeLang from './../../langJson/azeJson.json';
import engLang from './../../langJson/engJson.json';
import {IoCloseCircle, IoCloudUploadOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline} from 'react-icons/io5'

const AdminDashboard: NextPage = () => {

  const [name , setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("")
  const [restaurantSelect , setRestaurantSelect] = useState("");
  //input states 

  const [restData, setRestData] = useState([]);
  const [openAddProduct, setOpenAddProduct] = useState(false)
  const [fileName, setFileName] = useState("No file selected")
  const [errorOpen, setErrorOpen] = useState(false);
  const [winOpen ,setWinOpen] = useState(false);
  const [openHamburger, setOpenHamburger] = useState(false);
  // const [rgb, setRgb] = useState([]);
  const router = useRouter();
  const [langURL, setLangURL] = useState('https://flagdownload.com/wp-content/uploads/Flag_of_United_Kingdom_Flat_Round-128x128.png')
  const [langOpen, setLangOpen] = useState(false)
  const [lang, setLang] = useState(engLang)
  useEffect(() => {
    axios.get('https://foody-project-green.vercel.app/api/restuarants')
    .then((res:any) => {
      setRestData(res.data.result.data)
    })
  }, [])

    useEffect(() => {
      if(router.locale == "en"){
        setLangURL("https://flagdownload.com/wp-content/uploads/Flag_of_United_Kingdom_Flat_Round-128x128.png")
        setLang(engLang)
      } else if (router.locale == "az"){
        setLangURL("https://flagdownload.com/wp-content/uploads/Flag_of_Azerbaijan_Flat_Round-128x128.png")
        setLang(azeLang)
      } else if (router.locale == "ru"){
        setLangURL("https://flagdownload.com/wp-content/uploads/Flag_of_Russia_Flat_Round-128x128.png")
        setLang(rusLang)
      }
    } , [router])

    var langArr = [
        <Link href={'/admin'} locale="en">
            <img className={navStyle.langPhoto} src="https://flagdownload.com/wp-content/uploads/Flag_of_United_Kingdom_Flat_Round-128x128.png" alt="lang_eng" onClick={() => {
                setLangURL("https://flagdownload.com/wp-content/uploads/Flag_of_United_Kingdom_Flat_Round-128x128.png")
                setLangOpen(false)
            }} />
        </Link>,
        <Link href={'/admin'} locale="az">
            <img className={navStyle.langPhoto} src="https://flagdownload.com/wp-content/uploads/Flag_of_Azerbaijan_Flat_Round-128x128.png" alt="lang_aze" onClick={() => {
                setLangURL("https://flagdownload.com/wp-content/uploads/Flag_of_Azerbaijan_Flat_Round-128x128.png")
                setLangOpen(false)
            }} />
        </Link>,
        <Link href={'/admin'} locale="ru">
            <img className={navStyle.langPhoto} src="https://flagdownload.com/wp-content/uploads/Flag_of_Russia_Flat_Round-128x128.png" alt="lang_rus" onClick={() => {
                setLangURL("https://flagdownload.com/wp-content/uploads/Flag_of_Russia_Flat_Round-128x128.png")
                setLangOpen(false)
                console.log(router.locale)
            }} />
        </Link>
    ]

  useEffect(() => {
    const interval = setInterval(() => {
      if(winOpen){
        setWinOpen(false)
      } else if (errorOpen) {
        setErrorOpen(false)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [winOpen, errorOpen])

  useEffect(() => {
    if(!localStorage.getItem("access-token")){
        window.location.href = "/admin/login"
    }
  }, [])

  // useEffect(() => {
  //   var rgbArr:SetStateAction<string[]>;
  //     for(let i = 0; i < restData.length; i++){
  //       var oneRgb:number = Math.floor(Math.random() * 255) - 1;
  //       var secondRgb:number = Math.floor(Math.random() * 255) - 1;
  //       var thirdRgb:number = Math.floor(Math.random() * 255) - 1;
  //       rgbArr.push(`rgb(${oneRgb}, ${secondRgb}, ${thirdRgb})`);
  //     }
  //     setRgb(rgbArr);
  // }, [restData])

  return (
    <div>
      <Head>
        <title>{lang.admin}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {openHamburger ? <section style={{width:"100%", position:"absolute", backgroundColor:"rgba(0, 0, 0, 0.635)", height:"150vh"}}>
        <div style={{width:"70%", height:"150vh", backgroundColor:"#C74FEB"}}>
          <div style={{paddingTop:"20%", height:"100vh"}}>
            <AdminFloatNav />
          </div>
        </div>
      </section> : ''}
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
      <section style={openAddProduct ? {zIndex: '1',display:"block", position:"absolute", top:"0", right:"0", backgroundColor:"rgba(0, 0, 0, 0.635)", width:"100%", height:"100%"} : {display:"none"}}>
        <div style={{width:"100%", height:"100%", position:"relative", display:"flex"}}>
          <div className={styleInd.indBoxUpload}>
            <div>
              <IoCloseCircle size={'20'} className={styleInd.btnCloseProduct} onClick={() => {
                setOpenAddProduct(false)
              }}></IoCloseCircle>
            </div>
            <div className={styleInd.uploadBox}>
              <div className={styleInd.uploadBoxText}>
                <h3 className={styleInd.addProdText}>{lang.addProduct}</h3>
                <h4 className={styleInd.ehmed}>{lang["product-upload-image-text"]}</h4>
              </div>
              <div className={styleInd.formImageBox}>
              <form onClick={(event:any) => event.target.querySelector(".input-files-ind")?.click()} className={styleInd.formImg}>
                <input type="file" accept="image/*" className="input-files-ind" hidden onChange={(e) => {
                var filesi = e.target.files
                if (filesi && filesi.length > 0) {
                const file = filesi[0]
                if(file instanceof File){
                  setImage(URL.createObjectURL(file));
                  }
                }
                }}/><IoCloudUploadOutline color={"#fff"} size={30}/>
              </form>
                {image ? <img src={image} alt="photo" className={styleInd.imageAdd}/> : ''}
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
                      <input type="text" placeholder={lang.name} value={name} id="name" className={styleInd.inpAdd} onChange={(e) => {
                        setName(e.target.value)
                      }}/>
                    </div>
                    <div className={styleInd.formInpDiv}>
                      <label className={styleInd.label} htmlFor="description">{lang.desciprt}</label>
                      <input type="text" placeholder={lang.desciprt} value={description} id="description" className={styleInd.inpAdd} onChange={(e) => {
                        setDescription(e.target.value);
                      }}/>
                    </div>
                    <div className={styleInd.formInpDiv}>
                      <label className={styleInd.label} htmlFor="price">{lang.price}</label>
                      <input type="number" placeholder={lang.price} value={price} id="price" className={styleInd.inpAdd} onChange={(e:any) => {
                        setPrice(e.target.value);
                      }}/>
                    </div>
                    <div className={styleInd.formInpDiv}>
                      <label className={styleInd.label} htmlFor="restaurant">{lang.restaurant}</label>
                      <select id="restaurant" onChange={(e) => {
                        setRestaurantSelect(e.target.value)
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
                  setName("");
                  setDescription("");
                  setImage("");
                  setPrice(0);
                  setOpenAddProduct(false)
                }}>{lang.cancel}</button>
              </div>
              <div className={styleInd.btnChildBoxCreate}>
                <button className={styleInd.createBtn} onClick={() => {
                  if(name && description && image && price) {
                    axios.post("https://foody-project-green.vercel.app/api/products", {
                      name,
                      description,
                      img_url: image,
                      price
                    }).then(function (res) {
                      setWinOpen(true)
                    }).catch(function (error) {
                      setErrorOpen(true)
                    })
                  } else {
                    setErrorOpen(true)
                  }
                }}>{lang["create-project"]}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styleInd.box}>
        <header>
        <div className={navStyle.header}>
                <div style={{display:"flex", gap:"5px"}}>
                    <div className={styleInd.hamburgerBox} onClick={() => {
                      if(openHamburger){
                        setOpenHamburger(false)
                      } else {
                        setOpenHamburger(true)
                      }
                    }}>
                      <div className={styleInd.hamburger} style={openHamburger ? {transform:"rotate(-45deg)", marginBottom:"-3px", transition:"calc(0.2s)"} : {transform:"rotate(0deg)"}}></div>
                      <div className={styleInd.hamburger} style={openHamburger ? {display:"none"} : {display:"block", transition:"calc(0.2s)", width:"15px"}}></div>
                      <div className={styleInd.hamburger} style={openHamburger ? {transform:"rotate(45deg)", marginTop:"-2px", transition:"calc(0.2s)"} : {transform:"rotate(0deg)"}}></div>
                    </div>
                    <Logo />
                </div>
                <div className={navStyle.otherItemBox}>
                    <div style={{width:"33%", marginRight:"15%"}}>
                        <button type="button" className={navStyle.btn} onClick={() => {
                            setOpenAddProduct(true)
                        }}><span style={{fontSize:"13px"}}>+</span> <span className={navStyle.productBtnText}>{lang.addProduct}</span></button>
                    </div>
                    <div style={{position:"relative", width:"33%"}}>
                                <div className={navStyle.langBoxOpen}>
                                    <img className={navStyle.langPhoto} src={langURL} alt="lang_img" onClick={() => {
                                        if(langOpen){
                                            setLangOpen(false)
                                        } else {
                                            setLangOpen(true)
                                        }
                                    }}/>
                                    <div style={langOpen ? {backgroundColor: '#27283C',display:"flex", position:"absolute", flexDirection:"column", gap:"5px"} : {display:"none"}}>
                                        {langArr}
                                    </div>
                                </div>
                    </div>
                    <div className={navStyle.avatarAdmin}>
                        <img src={'https://s3-alpha-sig.figma.com/img/9046/3197/5251ab1ede247b2634abc88e54c5e739?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Et0s8qO6s5aPBwvRfLvstJ8u5f0mOEZZ7LiHgM07-18XwsDZkb01XZEDns-D-QQSB4a5a3NMOcHKVwzDfTN0xsV4hdpiqM5FfCVo1MVEAKaZQW-kBW1kfMDjlhfcWeYR0iLvfo1nQQk6xsYPDRpUmK3C1hnfKEB5FzNgyFGI42rrNQu1DuE1jzZzrF6KepCSSfEs5iSF7QwfQsyWX~qJjBPZCq3XU2SAjqBlWsI-6IP-~lUjTxFCORhyLSkvZLmQxTY1jx427yKy3AhDnPBe58xsySNpWcs~F2oqlRk1BUnOm7Yn-aVCwoU~5endeXYYgA2FcY63xx6sQ2GimUg1lQ__'} className={navStyle.avatarImage} alt="avatar_image"/>
                        <h4 className={navStyle.adminText}>{lang.admin}</h4>
                    </div>
                </div>
            </div>
        </header>
        <div className={styleInd.containBox}>
          <div className={styleInd.navDiv}>
            <div className={styleInd.navBoxInd}>
              <AdminFloatNav/>
            </div>
            <div className={styleInd.eacampFooter}>
              <AdminFootEaCamp />
            </div>
          </div>
          <div className={styleInd.containerDiv}>
            <div className={styleInd.containerBoxChild}>
              <div className={styleInd.container}>
                <div style={{margin:'2%'}}>
                  <h4 className={styleInd.containerText}>{lang.orders}</h4>
                </div>
                <div style={{display:"flex", justifyContent:"center", alignItems:"center", alignSelf:"center", width:"80%", height:"80%"}}>
                  {restData.length >= 1 ? <div style={{margin:'2%'}}>
                    <Doughnut data={{
                      labels: restData?.map((rest:any) => rest.name),
                      datasets: [
                        {
                          label:'count',
                          data: restData?.map((rest:any) => rest.delivery_min)
                        },
                      ],
                    }}/>
                  </div> : <h5 className={styleInd.containerChildText}>{lang["t-a-n-o-a"]}</h5>}
                </div>
              </div>
              <div className={styleInd.container}>
                <div style={{margin:'2%'}}>
                  <h4 className={styleInd.containerText}>{lang["total-salary"]}</h4>
                </div>
                <div>
                  <Line data={{
                    labels:['Jan', "Dec" , "SENT"],
                    datasets:[
                      {
                        label:"kfc",
                        data: [12, 56 ,12 ,54]
                      },
                      {
                        label:"mcd",
                        data: [45, 89,76]
                      }
                    ]
                  }}/>
                </div>
              </div>
            </div>
            <div className={styleInd.containerBoxChild}>
              <div className={styleInd.container} style={{display:"flex", flexDirection:"column"}}>
                <div style={{margin:'2%', width:"100%"}}>
                  <h4 className={styleInd.containerText}>{lang["assigned-risk"]}</h4>
                </div>
                <div style={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center", alignSelf:"center"}}>
                  <h5 className={styleInd.containerChildText}>{lang["t-a-n-o-a"]}</h5>
                </div>
              </div>
              <div className={styleInd.container} style={{display:"flex", flexDirection:"column"}}>
                <div style={{margin:'2%', width:"100%"}}>
                  <h4 className={styleInd.containerText}>{lang["assigned-action-items"]}</h4>
                </div>
                <div style={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center", alignSelf:"center"}}>
                  <h5 className={styleInd.containerChildText}>{lang["t-a-n-t-i-a"]}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
