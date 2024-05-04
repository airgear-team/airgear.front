
import React, { createContext, useContext, useState } from 'react';
import axios from "axios";

const ImagesContext = createContext();

export const ImagesProvider = ({ children }) => {
    const [imagesUrl, setImagesUrl] = useState([]);

    const uploadImages = async (userId, goodsId, images, token) => {
        try {
            const formData = new FormData();
            images.forEach((image, index) => {
                formData.append(`images`, JSON.stringify(image));
            })
            console.log("Form data: ", formData)
            const response = await axios.post(`http://localhost:8080/images/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            })

            if (response.status === 200) {
                setImagesUrl(response.data.images);
            } else {
                console.error('Failed to upload image')
            }
        } catch (error) {
            console.error('Error uploading image', error);
        }
    }

    return (
        <ImagesContext.Provider value={{ imagesUrl, uploadImages }}>
            {children}
        </ImagesContext.Provider>
    );
};

export const useImages = () => {
    return useContext(ImagesContext);
};
