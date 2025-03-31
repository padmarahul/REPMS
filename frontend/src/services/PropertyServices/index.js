import axiosInstance from "../axiosInstance";


// const REPMS_PROPERTY_BASE_URL = 'http://localhost:8082/repms';

const REPMS_PROPERTY_BASE_URL = 'http://52.151.249.242:8082/repms';

class PropertyServices {
    saveProperty(property) {
        return axiosInstance.save(`${REPMS_PROPERTY_BASE_URL}/properties/saveProperty`, property)
    }
    updateProperty(property, propertyId) {
        return axiosInstance.put(`${REPMS_PROPERTY_BASE_URL}/properties/updateProperty/${propertyId}`, property)
    }

    deleteProperty(propertyId) {
        return axiosInstance.delete(`${REPMS_PROPERTY_BASE_URL}/properties/deleteProperty/${propertyId}`)
    }

    getAllProperties() {
        return axiosInstance.get(`${REPMS_PROPERTY_BASE_URL}/properties/getAllProperties`)
    }

    getPropertyById(propertyId) {
        return axiosInstance.get(`${REPMS_PROPERTY_BASE_URL}/properties/getProperty/${propertyId}`)
    }
}

export default new PropertyServices();