import axiosInstance from "../axiosInstance";


const REPMS_PROPERTY_BASE_URL = 'http://localhost:8082/repms';


class EmployeeServices  {
    deleteProduct(productId){
      return axiosInstance.delete(`${REPMS_PROPERTY_BASE_URL}/product/deleteProduct/${productId}`)
    }
    updateProduct(product){
        return axiosInstance.put(`${REPMS_PROPERTY_BASE_URL}/product/updateProduct`,product)
    }

    addProduct(product){
        return axiosInstance.post(`${REPMS_PROPERTY_BASE_URL}/product/addProduct`,product)
    }
}

export default new EmployeeServices();