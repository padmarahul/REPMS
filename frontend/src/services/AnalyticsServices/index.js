
import axiosInstance from "../axiosInstance";

// const REPMS_ANALYTICS_BASE_URL = 'http://localhost:8084/repms';

const REPMS_ANALYTICS_BASE_URL = 'http://20.42.58.254:8084/repms';

class AnalyticsServices {

    getAnalyticsSummary() {
        return axiosInstance.get(`${REPMS_ANALYTICS_BASE_URL}/analytics/summary`)
    }

}

export default new AnalyticsServices();