import React from "react";
import { Link } from "react-router-dom";

const ProductsList = (props) => {
    return (
        <div>
            {props.products.map((product) => (
                <div key={product._id}>
                    <Link to={`/${product._id}`}>
                        <p>{product.title}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ProductsList;