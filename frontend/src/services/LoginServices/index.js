import axiosInstance from "../axiosInstance";

// const REPMS_LOGIN_BASE_URL = 'http://localhost:8081/repms';

const REPMS_LOGIN_BASE_URL = 'http://52.151.249.242:8081/repms';

class LoginServices {

    login(username, password) {
        return axiosInstance.post(`${REPMS_LOGIN_BASE_URL}/user/login/${username}/${password}`)
    }

    verifyOtp(id, otp) {
        return axiosInstance.post(`${REPMS_LOGIN_BASE_URL}/user/login/${id}/verifyotp/${otp}`)
    }

    reSendOtp(id) {
        return axiosInstance.post(`${REPMS_LOGIN_BASE_URL}/user/resendotp/${id}`)
    }

    signUp(user) {
        return axiosInstance.post(`${REPMS_LOGIN_BASE_URL}/user/signup`, user)
    }

    changepassword(userName, password) {
        return axiosInstance.put(`${REPMS_LOGIN_BASE_URL}/user/changepassword/${userName}/${password}`)
    }

    getUserDetails(userId) {
        return axiosInstance.get(`${REPMS_LOGIN_BASE_URL}/user/getuser/${userId}`)
    }
}

export default new LoginServices();