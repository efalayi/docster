import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';
import getServerError from '../utils/GetServerError';

/**
 * Delete Document
 * @param {object} document 
 * @returns {object} action
 */
export function deleteDocumentSuccess(document) {
  return {
    type: ActionTypes.DELETE_DOCUMENT,
    document
  }
}

/**
 * @param {object} document 
 * @returns {func} dispatch
 */
export function deleteDocument(document){
  return function(dispatch) {
    return axios.delete(`/api/v1/documents/${document.id}`)
      .then(() => {
        dispatch(deleteDocumentSuccess(document));
      })
      .catch(error => {
        throw(error);
      });
  }
}