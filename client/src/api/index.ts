import axios from 'axios';

const baseURL = 'http://localhost:3000/';
class productAPI {
  async createProductAPI(id: string) {
    try {
      const res = await axios.get(`${baseURL}product-create/${id}`);
      return res.data;
    } catch (err) {}
  }

  async updateProductAPI(id: string) {
    try {
      const res = await axios.get(`${baseURL}product-update/${id}`);
      return res.data;
    } catch (err) {}
  }

  async deleteProductAPI(id: string) {
    try {
      const res = await axios.get(`${baseURL}product-delete/${id}`);
      return res.data;
    } catch (err) {}
  }
}

export default new productAPI();
