import axiosInstance from "../axiosInstance";


const PARTPRO_BASE_URL = 'http://40.90.239.103:8080/ppms';


class DashboardServices  {

    getAllProducts() {
        return axiosInstance.get(`${PARTPRO_BASE_URL}/dashboard/getProducts`)
    }

    getProductDetails(productId){
      return axiosInstance.get(`${PARTPRO_BASE_URL}/dashboard/getProductDetails`,{
        params:{
          productId:productId
        }
      })
    }
    

  getAllCategories(){
    return axiosInstance.get(`${PARTPRO_BASE_URL}/dashboard/getCategories`)
  }

  getProductsByCategoryName(category){
    return axiosInstance.get(`${PARTPRO_BASE_URL}/dashboard/getProductsByCategory`,{
      params:{
        category:category
      }
    });
  }

  getLocationDetails(username){
    return axiosInstance.get(`${PARTPRO_BASE_URL}/dashboard/getLocation`, {
      params: {
        username: username
      }
    });
  }

  addVehicleDetails(userId, vehicle){
    return axiosInstance.post(`${PARTPRO_BASE_URL}/dashboard/addVehicleInfo/${userId}`,vehicle)
  }
  
  

}

export default new DashboardServices();