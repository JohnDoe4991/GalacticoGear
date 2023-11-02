import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    getAllProductsThunk,
    getProductDetailsThunk,
    updateProductThunk,
} from "../../../store/product";
import { useModal } from "../../../context/Modal";

export default function UpdateProductModal({ productId }) {
    const { push } = useHistory();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        size: "",
        price: "",
    });
    const { closeModal } = useModal();
    const [validationObject, setValidationObject] = useState({});
    const [disableSubmitButton, setDisableSubmitButton] = useState(true);

    useEffect(() => {
        dispatch(getProductDetailsThunk(productId)).then((data) => {
            setFormData({
                title: data.title,
                description: data.description,
                size: data.size,
                price: data.price,
            });
        });
    }, [productId]);

    useEffect(() => {
        const errorsObject = {};

        if (formData.description.length < 10) {
            errorsObject.description =
                "Description must be more than 10 characters.";
        }

        if (formData.title.length < 5) {
            errorsObject.title = "Title must be more than 5 characters.";
        }

        if (formData.size.length < 3) {
            errorsObject.size = "Size must be more than 3 characters.";
        }

        if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
            errorsObject.price = "Price must be a valid number greater than 0.";
        }

        setValidationObject(errorsObject);
        setDisableSubmitButton(Object.keys(errorsObject).length > 0);
    }, [formData.description, formData.title, formData.size, formData.price]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = await dispatch(updateProductThunk(formData, productId));

        if (!Object.values(productData).includes("errors")) {
            closeModal();
            dispatch(getAllProductsThunk());
        }
    };

    return (
        <div>
            <h1>Update Product</h1>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                />
                {validationObject.title && (
                    <div className="error-box-product">
                        <p className="errors-one-pproduct">{validationObject.title}</p>
                    </div>
                )}

                <label>Description</label>
                <div className="error-box-product">
                    {validationObject.description && (
                        <p className="errors-one-pproduct">
                            {validationObject.description}
                        </p>
                    )}
                </div>
                <textarea
                    type="text"
                    className="update-product-text-area"
                    name="description"
                    placeholder="Please write at least 10 characters"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                />

                <label htmlFor="size">Size</label>
                <input
                    type="text"
                    name="size"
                    placeholder="Size"
                    value={formData.size}
                    onChange={(e) =>
                        setFormData({ ...formData, size: e.target.value })
                    }
                />
                {validationObject.size && (
                    <div className="error-box-product">
                        <p className="errors-one-pproduct">{validationObject.size}</p>
                    </div>
                )}

                <label htmlFor="price">Price: $</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    max="100000"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                    }
                />
                {validationObject.price && (
                    <div className="error-box-product">
                        <p className="errors-one-pproduct">{validationObject.price}</p>
                    </div>
                )}

                <button
                    className="submit-update-product"
                    type="submit"
                    disabled={disableSubmitButton}
                >
                    Update Product
                </button>
            </form>
        </div>
    );
}
