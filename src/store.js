import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alignment: [],
    status: '',
    upload: false,
  },
  mutations: {
    // Upload Alignment
    /**
     * Upload the alignement data in the alignement variable.
     * @param {Object} state store data.
     * @param {Object} alignment alignment data.
     */
    upload_data_alignment(state, alignment) {
      // state.alignment = alignment;
      const s = state;
      s.alignment = alignment;
    },
  },

  actions: {
    uploadJsonAlignment({ commit }, fileName) {
      return new Promise((resolve, reject) => {
        commit('upload_request');
        axios.get(`${fileName}`).then(
          (resp) => {
            if (resp.data) {
              commit('upload_data_alignment', resp.data.alignment);
            }
            resolve(resp);
          },
          (resp) => {
            // console.log('error', resp);
            reject(resp);
          },
        );
      });
    },
  },

  getters: {
    getDataAlignment: state => state.alignment,
    getIsUpload: state => state.upload,
  },
});
