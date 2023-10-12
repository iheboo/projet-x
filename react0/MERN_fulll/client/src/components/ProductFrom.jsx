import React,{useState} from 'react'
import axios from "axios";

const ProductFrom = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const createProduct = (e) => {
        e.preventDefault();
        const tempObject = {
            title,
            price,
            description,
        };
        axios
            .post("http://localhost:8000/api/products", tempObject)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
    };

    return (
        <form
            className="d-flex flex-column align-items-start gap-2"
            onSubmit={createProduct}
        >
            <div>
                <label htmlFor="title" className="form-label">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </div>

            <div>
                <label htmlFor="price" className="form-label">
                    Price
                </label>
                <input
                    type="number"
                    id="price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                />
            </div>
            <div>
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <textarea
                    name=""
                    id="description"
                    cols="30"
                    rows="5"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                ></textarea>
            </div>

            <button className="btn btn-primary">Create</button>
        </form>
  )
}

export default ProductFrom