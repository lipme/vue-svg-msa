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
    // Upload Confirmation
    /**
     * Confirm the upload of the Jsons file.
     * @param {Object} state store data.
     */
    confirm_upload(state) {
      state.status = 'success';
      state.upload = true;
    },
    /**
     * Unconfirm the upload of the Jsons file.
     * @param {Object} state store data.
     */
    unconfirm_upload(state) {
      state.status = '';
      state.upload = false;
    },
    /**
     * Signal an error of the upload of the Jsons file.
     * @param {Object} state store data.
     */
    upload_error(state) {
      state.status = 'error';
      state.upload = false;
    },
    /**
     * Signal the upload request of the Jsons file.
     * @param {Object} state store data.
     */
    upload_request(state) {
      state.status = 'loading';
      state.upload = true;
    },

    // Upload Alignment
    /**
     * Upload the alignement data in the alignement variable.
     * @param {Object} state store data.
     * @param {Object} alignment alignment data.
     */
    upload_data_alignment(state, alignment) {
      state.alignment = alignment;
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
            } else {
              commit('unconfirm_upload');
            }
            resolve(resp);
          },
          (resp) => {
            // console.log('error', resp);
            commit('upload_error');
            commit('unconfirm_upload');
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
