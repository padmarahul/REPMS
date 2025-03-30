import axiosInstance from "../axiosInstance";


 const PARTPRO_BASE_URL = 'http://40.90.239.103:8080/ppms';


class CustomerServices {

    updatePersonalDetails(userId, customer) {
        return axiosInstance.put(`${PARTPRO_BASE_URL}/customer/update/${userId}`, customer)
    }

    manageFeedback(userId, productId, rating) {
        return axiosInstance.post(`${PARTPRO_BASE_URL}/customer/${userId}/addorUpdateFeedback`,null,{
            params:{
                productId:productId,
                rating:rating
            }
          })
    }

    viewFeedback(userId, productId){
        return axiosInstance.get(`${PARTPRO_BASE_URL}/customer/${userId}/viewFeedback/${productId}`)
    }


}

export default new CustomerServices();




