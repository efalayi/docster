import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';

/**
 * @param {object} documents
 * @returns {object} action
 */
export function getPublicDocumentsSuccess(documents) {
  return {
    type: ActionTypes.GET_PUBLIC_DOCUMENTS,
    documents
  }
}

/**
 * Get all public documents from database
 * @param {number} userId 
 * @returns {func} dispatch
 */
export function getPublicDocuments() {
  return function(dispatch) {
    return axios.get(`/api/v1/public-documents`)
      .then(response => {
        if(!response.data.documents){
          dispatch(getPublicDocumentsSuccess({}));
        } else {
          dispatch(getPublicDocumentsSuccess(response.data.documents)); 
        }
      })
      .catch(error => {
        throw(error);
      });
  }
}