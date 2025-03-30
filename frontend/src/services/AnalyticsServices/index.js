
import axiosInstance from "../axiosInstance";

const PARTPRO_BASE_URL = 'http://40.90.239.103:8080/ppms';



class PaymentServices  {

    createPayment(userId, cart) {
        return axiosInstance.post(`${PARTPRO_BASE_URL}/payment/${userId}/create`,cart)
    }

    trackOrder(orderId) {
        return axiosInstance.get(`${PARTPRO_BASE_URL}/payment/trackorderdetails/${orderId}`)
    }

    manageOnlineSales() {
        return axiosInstance.get(`${PARTPRO_BASE_URL}/payment/getOnlineSales`)
    }

}

export default new PaymentServices();




