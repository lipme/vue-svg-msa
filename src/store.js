import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alignment: [],
    url: '',
    status: '',
    upload: false,
    domainIdSelectedAlignment: '1'
  },

  mutations: {
    // Upload Confirmation
    /**
     * Confirm the upload of the Jsons file.
     * @param {Object} state store data.
     * @param {String} url jsons url.
     */
    confirm_upload(state, url) {
      state.status = 'success';
      state.upload = true;
      state.url = url;
    },
    /**
     * Unconfirm the upload of the Jsons file.
     * @param {Object} state store data.
     */
    unconfirm_upload(state) {
      state.status = '';
      state.upload = false;
      state.url = '';
    },
    /**
     * Signal an error of the upload of the Jsons file.
     * @param {Object} state store data.
     */
    upload_error(state) {
      state.status = 'error';
      state.upload = false;
      state.url = '';
    },
    /**
     * Signal the upload request of the Jsons file.
     * @param {Object} state store data.
     */
    upload_request(state) {
      state.status = 'loading';
      state.upload = true;
      state.url = '';
    },

    // Upload Alignment
    /**
     * Upload the alignement data in the alignement variable.
     * @param {Object} state store data.
     * @param {Object} alignment alignment data.
     */
    upload_data_alignment(state, alignment) {
      state.alignment = alignment;
    }
  },

  actions: {
    /**
     * Check if the upload is doing well.
     * @param {Object} commit access to mutations.
     */
    uploadChecker({ commit }) {
      return new Promise((resolve, reject) => {
        commit('upload_request');
        Vue.http.post('tests/uploadSuccess.json').then(
          resp => {
            const data = resp.body;
            const { status } = data;
            if (status === true) {
              commit('confirm_upload', data.url);
            } else {
              commit('unconfirm_upload');
            }
            resolve(resp);
          },
          resp => {
            console.log('error', resp);
            commit('upload_error');
            reject(resp);
          }
        );
      });
    },
    uploadCheckerURL({ commit }, fileName) {
      return new Promise((resolve, reject) => {
        commit('upload_request');
        axios.get(`${fileName}`).then(
          resp => {
            if (resp.data) {
              commit('upload_data_alignment', resp.data.alignment);
            } else {
              commit('unconfirm_upload');
            }
            resolve(resp);
          },
          resp => {
            console.log('error', resp);
            commit('upload_error');
            commit('unconfirm_upload');
            reject(resp);
          }
        );
      });
    }
  },

  getters: {
    getUrl: state => state.url,
    getDataAlignment: state => state.alignment,
    getDomainIdSelectedAlignment: state => state.domainIdSelectedAlignment
  }
});
