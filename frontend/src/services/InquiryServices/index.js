import axiosInstance from "../axiosInstance";


// const REPMS_INQUIRY_BASE_URL = 'http://localhost:8083/repms/inquiries';

const REPMS_INQUIRY_BASE_URL = 'http://localhost:8083/repms/inquiries';
class InquiryServices {

  sendInquiry(inquiryObj) {
    return axiosInstance.post(`${REPMS_INQUIRY_BASE_URL}/sendInquiry`, inquiryObj)
  }

  getAllInquiries() {
    return axiosInstance.get(`${REPMS_INQUIRY_BASE_URL}/getAllInquiries`)
  }

  getInquiryById(inquiryId) {
    return axiosInstance.get(`${REPMS_INQUIRY_BASE_URL}/getInquiry/${inquiryId}`)
  }

  deleteInquiryById(inquiryId) {
    return axiosInstance.delete(`${REPMS_INQUIRY_BASE_URL}/deleteInquiry/${inquiryId}`)
  }

}

export default new InquiryServices();