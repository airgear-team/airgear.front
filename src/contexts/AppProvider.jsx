
import {ImagesProvider} from "./imagesProduct/ImagesProvider.jsx";

const AppProvider = ({ children }) => {
    return (
        <ImagesProvider>
            {children}
        </ImagesProvider>
    );
};

export default AppProvider;