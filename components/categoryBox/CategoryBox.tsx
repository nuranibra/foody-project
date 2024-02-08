import { useEffect, useState } from 'react';
import catStyle from './../../pages/admin/category/category.module.css'
import { IoAlertCircleOutline, IoHammerOutline, IoTrashOutline } from 'react-icons/io5';
import axios from 'axios';

export default function CategoryBox () {

    const [categoryData, setCategoryData] = useState([])
    const [openTrash, setOpenTrash] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:3000/api/category")
            .then(res => {
                setCategoryData(res.data.result.data)
            }).catch(err => {
                alert(err)
            })
    },[openTrash])

    return(
        <>
            
        </>
    );
}