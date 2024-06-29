import React, {useState} from 'react';
import {useImages} from "../../contexts/imagesProduct/ImagesProvider.jsx";

const ImagesUploadForm = () => {
    const {uploadImages} = useImages()
    const [selectedImage, setSelectedImage] = useState([]);

    const handleImageChange = (e) => {
        const files = [...e.target.files];
        console.log("Selected: ", files);
        setSelectedImage(files);
    }

    const handelUpload = () => {
        const userId = '1'
        const goodsId = '1'
        const userToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJncmlpaWluMS5kb2RlMUBleGFtcGxlLmNvbSIsInJvbGVzIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzE0ODIyNjk3LCJleHAiOjE3MTQ4NDA2OTd9.fXP3SCfB7HNzn76pDGuGDQ4cGHJLUxkDt3JlXXdW1pw'

        const imageNames = selectedImage.map(image => image)
        console.log('Images Name: ', imageNames)

        uploadImages(userId, goodsId, imageNames, userToken)
    }

    return (
        <div>
            <input type="file" multiple onChange={handleImageChange} name="" id=""/>
            <button onClick={handelUpload}>Upload Images</button>
        </div>
    );
};

export default ImagesUploadForm;