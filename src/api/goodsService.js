import {BASE_URL} from "../constants";

const handleResponse = async ({response}) => {
    if (!response.ok) {
        const errorMessage = await response.text;
        throw new Error(errorMessage);
    }
    return response.json();
}

const fetchRandomGoods = async ({quantity}) => {
    const response = fetch(`${BASE_URL}/goods/random-goods?quantity=${quantity}`);
    await handleResponse(response);
}