import { useState } from 'react';
import styleInd from './../../pages/admin/index.module.css'
import styleFormImage from './formimage.module.css'
import { IoCloudUploadOutline } from 'react-icons/io5';
import avatar from './../navbar/adminNav/image/avatar.png'

export default function FormImg () {

    const [fileName, setFileName] = useState("Not choose image");
    const [imageProd, setImageProd] = useState(null)

    return(
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
    );
}