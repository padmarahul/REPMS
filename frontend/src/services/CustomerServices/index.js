import axiosInstance from "../axiosInstance";


// const REPMS_PROFILE_BASE_URL = 'http://localhost:8085/repms';

const REPMS_PROFILE_BASE_URL = 'http://52.151.249.242:8085/repms'
class CustomerServices {

    savePropertyForCustomer(userId, propertyId) {
        return axiosInstance.post(`${REPMS_PROFILE_BASE_URL}/customers/save/${propertyId}`, null, {
            params: {
                userId: userId
            }
        });
    }

    getAllSavedProperties(userId) {
        return axiosInstance.get(`${REPMS_PROFILE_BASE_URL}/customers/getallsavedproperties`, {
            params: {
                userId: userId
            }
        });
    }

    deletePropertyForCustomer(userId, propertyId) {
        return axiosInstance.delete(`${REPMS_PROFILE_BASE_URL}/customers/removeproperty/${propertyId}`, {
            params: {
                userId: userId
            }
        });
    }
}

export default new CustomerServices();