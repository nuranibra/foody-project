import { useRouter } from "next/router";
import Logo from "../../logo/logo";
import navStyle from "./navbar.module.css";
import { useEffect, useState } from "react";
import styleInd from "./../../../pages/admin/index.module.css";
import Link from "next/link";
import avatar from "./image/avatar.png";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircle,
  IoCloseCircleOutline,
  IoCloudUploadOutline,
} from "react-icons/io5";
import axios from "axios";
import AdminFloatNav from "../adminFloatNav/AdminFloatNav";
import AdminFootEaCamp from "../../footer/adminFooter/adminEaCampFoot/AdminFootEaCamp";
import engLang from './../../../langJson/engJson.json';
import azeLang from './../../../langJson/azeJson.json';
import rusLang from './../../../langJson/rusJson.json';

export default function NavBarAdmin() {
  const router = useRouter();
  const [langURL, setLangURL] = useState(
    "https://flagdownload.com/wp-content/uploads/Flag_of_United_Kingdom_Flat_Round-128x128.png"
  );
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState(engLang);
  const [openProd, setOpenProd] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [restaurantSelect, setRestaurantSelect] = useState("");
  const [restData, setRestData] = useState([]);
  const [errorOpen, setErrorOpen] = useState(false);
  const [winOpen, setWinOpen] = useState(false);
  const [fileName, setFileName] = useState("No file selected");
  const [openHamburger, setOpenHamburger] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/api/restuarants").then((res: any) => {
      setRestData(res.data.result.data);
    });
  }, []);

  useEffect(() => {
    if (router.locale == "en") {
      setLangURL("https://flagdownload.com/wp-content/uploads/Flag_of_United_Kingdom_Flat_Round-128x128.png")
      setLang(engLang)
    } else if (router.locale == "az") {
      setLangURL("https://flagdownload.com/wp-content/uploads/Flag_of_Azerbaijan_Flat_Round-128x128.png")
      setLang(azeLang)
    } else if (router.locale == "ru") {
      setLangURL("https://flagdownload.com/wp-content/uploads/Flag_of_Russia_Flat_Round-128x128.png")
      setLang(rusLang)
    }
  }, [router])

  var langArr = [
    <Link href={router.asPath} locale="en">
      <img
        className={navStyle.langPhoto}
        src="https://flagdownload.com/wp-content/uploads/Flag_of_United_Kingdom_Flat_Round-128x128.png"
        alt="lang_eng"
        onClick={() => {
          setLangURL(
            "https://flagdownload.com/wp-content/uploads/Flag_of_United_Kingdom_Flat_Round-128x128.png"
          );
          setLangOpen(false);
        }}
      />
    </Link>,
    <Link href={router.asPath} locale="az">
      <img
        className={navStyle.langPhoto}
        src="https://flagdownload.com/wp-content/uploads/Flag_of_Azerbaijan_Flat_Round-128x128.png"
        alt="lang_aze"
        onClick={() => {
          setLangURL(
            "https://flagdownload.com/wp-content/uploads/Flag_of_Azerbaijan_Flat_Round-128x128.png"
          );
          setLangOpen(false);
        }}
      />
    </Link>,
    <Link href={router.asPath} locale="ru">
      <img
        className={navStyle.langPhoto}
        src="https://flagdownload.com/wp-content/uploads/Flag_of_Russia_Flat_Round-128x128.png"
        alt="lang_rus"
        onClick={() => {
          setLangURL(
            "https://flagdownload.com/wp-content/uploads/Flag_of_Russia_Flat_Round-128x128.png"
          );
          setLangOpen(false);
          console.log(router.locale);
        }}
      />
    </Link>,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (winOpen) {
        setWinOpen(false)
      } else if (errorOpen) {
        setErrorOpen(false)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [winOpen, errorOpen])

  return (
    <>
      {openHamburger ? <section style={{ zIndex: "1", position: "absolute", width: "100%", height: "100vh", top: "0", left: "0", backgroundColor: "rgba(0,0,0,0.635)" }}>
        <div style={{ width: "70%", height: "100vh", backgroundColor: "#C74FEB" }}>
          <div style={{ paddingTop: "20%", height: "100vh", boxSizing: "border-box" }}>
            <AdminFloatNav />
          </div>
        </div>
      </section> : ''}
      <div className={navStyle.header} >
        {winOpen ? (
          <section
            style={{
              top: "0",
              left: "0",
              position: "absolute",
              zIndex: "2",
              width: "100%",
              height: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: "10px",
                marginTop: "1%",
              }}
              className={styleInd.messageBox}
            >
              <IoCheckmarkCircleOutline
                style={{ color: "#108800" }}
                size={30}
              />
              <h2 className={styleInd.completedText}>Progress Completed</h2>
            </div>
          </section>
        ) : (
          ""
        )}
        {errorOpen ? (
          <section
            style={{
              top: "0",
              left: "0",
              position: "absolute",
              zIndex: "2",
              width: "100%",
              height: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: "10px",
                marginTop: "1%",
              }}
              className={styleInd.messageBox}
            >
              <IoCloseCircleOutline style={{ color: "#860000" }} size={30} />
              <div>
                <h2 className={styleInd.completedText}>Progress Failed</h2>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
        <section
          style={
            openProd
              ? {
                zIndex: "3",
                display: "block",
                position: "absolute",
                top: "0",
                right: "0",
                backgroundColor: "rgba(0, 0, 0, 0.635)",
                width: "100%",
                height: "100%",
              }
              : { display: "none" }
          }
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              display: "flex",
            }}
          >
            <div className={styleInd.indBoxUpload}>
              <div>
                <IoCloseCircle
                  size={"20"}
                  className={styleInd.btnCloseProduct}
                  onClick={() => {
                    setOpenProd(false);
                  }}
                ></IoCloseCircle>
              </div>
              <div className={styleInd.uploadBox}>
                <div className={styleInd.uploadBoxText}>
                  <h3 className={styleInd.addProdText}>{lang.addProduct}</h3>
                  <h4 className={styleInd.ehmed}>{lang["product-upload-image-text"]}</h4>
                </div>
                <div className={styleInd.formImageBox}>
                  <form onClick={(event: any) => event.target.querySelector(".input-file")?.click()} className={styleInd.formImg}>
                    <input type="file" accept="image/*" className="input-file" hidden onChange={(e) => {
                      var filesi = e.target.files
                      if (filesi && filesi.length > 0) {
                        const file = filesi[0]
                        if (file instanceof File) {
                          setImage(URL.createObjectURL(file));
                        }
                      }
                    }} /><IoCloudUploadOutline color={"#fff"} size={30} />
                  </form>
                  {image ? (
                    <img
                      src={image}
                      alt="photo"
                      className={styleInd.imageAdd}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className={styleInd.addProdBox}>
                <div className={styleInd.uploadBoxText}>
                  <h3 className={styleInd.addProdText}>
                    {lang["add-your-product-information"]}
                  </h3>
                </div>
                <div className={styleInd.formTextBox}>
                  <form>
                    <div className={styleInd.formInpDiv}>
                      <label className={styleInd.label} htmlFor="name">
                        {lang.name}
                      </label>
                      <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        id="name"
                        className={styleInd.inpAdd}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className={styleInd.formInpDiv}>
                      <label className={styleInd.label} htmlFor="description">
                        {lang.desciprt}
                      </label>
                      <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        id="description"
                        className={styleInd.inpAdd}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </div>
                    <div className={styleInd.formInpDiv}>
                      <label className={styleInd.label} htmlFor="price">
                        {lang.price}
                      </label>
                      <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        id="price"
                        className={styleInd.inpAdd}
                        onChange={(e: any) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </div>
                    <div className={styleInd.formInpDiv}>
                      <label className={styleInd.label} htmlFor="restaurant">
                        {lang.restaurant}
                      </label>
                      <select
                        id="restaurant"
                        onChange={(e) => {
                          setRestaurantSelect(e.target.value);
                        }}
                        className={styleInd.inpAdd}
                      >
                        <option>{lang.chooseRest}</option>
                        {restData.map((data: any, index: number) => (
                          <option key={index} value={data.id}>
                            {data.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </form>
                </div>
              </div>
              <div className={styleInd.btnBox}>
                <div className={styleInd.btnChildBoxCancel}>
                  <button
                    className={styleInd.cancelBtn}
                    onClick={() => {
                      setName("");
                      setDescription("");
                      setImage("");
                      setPrice(0);
                      setOpenProd(false);
                    }}
                  >
                    {lang.cancel}
                  </button>
                </div>
                <div className={styleInd.btnChildBoxCreate}>
                  <button
                    className={styleInd.createBtn}
                    onClick={() => {
                      if (name && description && image && price) {
                        axios
                          .post("http://localhost:3000/api/products", {
                            name,
                            description,
                            img_url: image,
                            rest_id: restaurantSelect,
                            price,
                          })
                          .then(function (res) {
                            setWinOpen(true);
                          })
                          .catch(function (error) {
                            setErrorOpen(true);
                          });
                      } else {
                        setErrorOpen(true);
                      }
                    }}
                  >
                    {lang["create-project"]}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div style={{ display: "flex", gap: "10px", zIndex: "2" }}>
          <div onClick={() => {
            if (openHamburger) {
              setOpenHamburger(false)
            } else {
              setOpenHamburger(true)
            }
          }} className={styleInd.hamburgerBox}>
            <div className={styleInd.hamburger} style={openHamburger ? { transform: "rotate(-45deg)", marginBottom: "-2px", transition: "calc(0.2s)" } : { transform: "rotate(0deg)" }}></div>
            <div className={styleInd.hamburger} style={openHamburger ? { display: "none" } : { display: "block", transition: "calc(0.2s)", width: "15px" }}></div>
            <div className={styleInd.hamburger} style={openHamburger ? { transform: "rotate(45deg)", marginTop: "-2px", transition: "calc(0.2s)" } : { transform: "rotate(0deg)" }}></div>
          </div>
          <Logo />
        </div>
        <div className={navStyle.otherItemBox}>
          <div style={{ width: "50%" }}>
            <button
              type="button"
              className={navStyle.btn}
              onClick={() => {
                setOpenProd(true);
              }}
            >
              <span>+</span>
              <span className={navStyle.productBtnText}>{lang.addProduct}</span>
            </button>
          </div>
          <div style={{ position: "relative", width: "33%" }}>
            <div className={navStyle.langBoxOpen}>
              <img
                className={navStyle.langPhoto}
                src={langURL}
                alt="lang_img"
                onClick={() => {
                  if (langOpen) {
                    setLangOpen(false);
                  } else {
                    setLangOpen(true);
                  }
                }}
              />
              <div
                style={
                  langOpen
                    ? {
                      backgroundColor: "#27283C",
                      display: "flex",
                      position: "absolute",
                      flexDirection: "column",
                      alignItems: "center",
                      alignSelf: "center",
                      justifyContent: "center",
                      gap: "5px"
                    }
                    : { display: "none" }
                }
              >
                {langArr}
              </div>
            </div>
          </div>
          <div className={navStyle.avatarAdmin}>
            <img
              src={
                "https://s3-alpha-sig.figma.com/img/9046/3197/5251ab1ede247b2634abc88e54c5e739?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Et0s8qO6s5aPBwvRfLvstJ8u5f0mOEZZ7LiHgM07-18XwsDZkb01XZEDns-D-QQSB4a5a3NMOcHKVwzDfTN0xsV4hdpiqM5FfCVo1MVEAKaZQW-kBW1kfMDjlhfcWeYR0iLvfo1nQQk6xsYPDRpUmK3C1hnfKEB5FzNgyFGI42rrNQu1DuE1jzZzrF6KepCSSfEs5iSF7QwfQsyWX~qJjBPZCq3XU2SAjqBlWsI-6IP-~lUjTxFCORhyLSkvZLmQxTY1jx427yKy3AhDnPBe58xsySNpWcs~F2oqlRk1BUnOm7Yn-aVCwoU~5endeXYYgA2FcY63xx6sQ2GimUg1lQ__"
              }
              className={navStyle.avatarImage}
              alt="avatar_image"
            />
            <h4 className={navStyle.adminText}>{lang.admin}</h4>
          </div>
        </div>
      </div>
    </>
  );
}
