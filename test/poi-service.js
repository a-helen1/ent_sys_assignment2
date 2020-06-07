'use strict'

const axios = require('axios');
const baseUrl = 'http://localhost:3000';

class PoiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getPois() {
    const response = await axios.get(this.baseUrl + 'api/pois');
    return response.data;
  }

  async getPoi(id) {
    try {
      const response = await axios.get(this.baseUrl + 'api/pois/' +id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createPoi(newPoi) {
    const response = await axios.post(this.baseUrl + '/api/pois', newPoi);
    return response.data;
  }

  async getUsers() {
    const response = await axios.get(this.baseUrl + '/api/users');
    return response.data;
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/user/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    const response = await axios.post(this.baseUrl + '/api/users', newUser);
    return response.data;
  }

  async deleteAllPois() {
    const response = await axios.delete(this.baseUrl + '/api/pois');
    return response.data;
  }

  async deleteOnePoi(id) {
    const response = await axios.delete(this.baseUrl + '/api/pois/' + id);
    return response.data;
  }
}

module.exports = PoiService;