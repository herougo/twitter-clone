import { useEffect, useState } from "react"
import { classifyMainContentType, MAIN_CONTENT_TYPES } from "../utils"
import { useLocation } from "react-router-dom";


const useLeftNavButtonActive = () => {
    const [activeContentType, setActiveContentType] = useState(MAIN_CONTENT_TYPES.home);
    const location = useLocation();

    useEffect(() => {
        const pathname = location.pathname;
        const mainContentType = classifyMainContentType(pathname);
        setActiveContentType(mainContentType);
    }, [location]);

    return activeContentType;
}

export default useLeftNavButtonActive;