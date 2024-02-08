import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductBox () {

    const [product, setProduct] = useState([])
    const [restuarants, setRestuarants] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/products")
            .then(res => {
                setProduct(res.data.result.data)
            }).catch(err => {
                alert(err)
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3000/api/restuarants")
            .then(res => {
                setRestuarants(res.data.result.data)
            }).catch(err => {
                alert(err)
            })
    }, [])

    return(
        <>
            <section>
                {product.map(item => (
                    <div>
                        <div>
                            <img src={item.img_url} alt="img_url"/>
                        </div>
                        <div>
                            <h2>{item.name}</h2>
                            <div>{restuarants.filter(rest => {
                                return(rest.id === item.rest_id)
                            }).map(prod => (
                                <h3>{prod.name}</h3>
                            ))}</div>
                        </div>
                        <div>
                            <h4>{`${item.price}$`}</h4>
                            <div>
                                <button>sil</button>
                                <button>rename</button>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}