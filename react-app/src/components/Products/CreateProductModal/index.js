import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createProductThunk } from "../../../store/product";


export default function CreateProductModal() {
    const { push } = useHistory();
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const [validationObject, setValidationObject] = useState({});
    const [key, setKey] = useState(Date.now())

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("size", size);
        formData.append("price", price);

        setImageLoading(true);
        const productData = await dispatch(createProductThunk(formData));

        setImage(null);
        setTitle("");
        setDescription("");
        setSize("");
        setPrice("");

        if (productData.errors === undefined || !productData.errors) {
            push("/all")
            return closeModal();
        } else {
            setImageLoading(false)
            setErrors(productData.errors);
            setKey(Date.now())
        }

    };

    useEffect(() => {
        const errorsObject = {};

        if (description.length < 10 || description.length > 1000) {
            errorsObject.description = "Description must be between 10 - 1000 characters.";
        }

        if (title.length < 5) {
            errorsObject.title = "Title must be more than 5 characters.";
        }

        if (size.length < 3) {
            errorsObject.size = "Size must be more than 3 characters.";
        }

        if (isNaN(price) || parseFloat(price) <= 0) {
            errorsObject.price = "Price must be a valid number greater than 0.";
        }

        setValidationObject(errorsObject);
    }, [description, title, size, price]);

    return (
        <div className="create-product-container">
            <h1 className="create-product-h1">Create a Product</h1>
            <form
                className="create-product-form"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                {errors &&
                    errors.length >= 1 &&
                    errors.map((error, idx) => (
                        <div className="error" key={idx}>
                            {error}
                        </div>
                    ))}

                <div className="div-file-section">
                    <label
                        className="style-file-upload">
                        <input
                            type="file"
                            accept="image/*"
                            className="hide-file-upload"
                            onChange={(e) => setImage(e.target.files[0])}
                            key={key}
                        />Upload Image
                    </label>
                    <div>{image !== null ? image["name"] : "Choose Image"}</div>
                </div>


                <label>Title</label>
                <div className="error-box-product">
                    {validationObject.title && (
                        <p className="errors-one-product"> {validationObject.title}</p>
                    )}
                </div>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description</label>
                <div className="error-box-product">
                    {validationObject.description && (
                        <p className="errors-one-product"> {validationObject.description}</p>
                    )}
                </div>
                <textarea
                    type="text"
                    name="description"
                    placeholder="Please write at least 10 characters"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>Size</label>
                <div className="error-box-product">
                    {validationObject.size && (
                        <p className="errors-one-product"> {validationObject.size}</p>
                    )}
                </div>
                <input
                    type="text"
                    name="size"
                    placeholder="Size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                />
                <label>Price</label>
                <div className="error-box-product">
                    {validationObject.price && (
                        <p className="errors-one-product"> {validationObject.price}</p>
                    )}
                </div>
                <input
                    type="text"
                    name="price"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <button
                    className="create-product-submit"
                    type="submit"
                    disabled={Object.keys(validationObject).length > 0}
                >
                    Submit
                </button>
                {imageLoading && (<div aria-busy="true" aria-describedby="progress-bar">
                    <progress id="progress-bar" aria-label="Content loading…"></progress>
                </div>)}
            </form>
        </div>
    );
}
