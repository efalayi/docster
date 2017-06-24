/* eslint-disable no-console*/
import colors from 'colors';
import Models from '../models';
import ServerConstants from '../../constants/ServerConstants';

const Document = Models.Document;
const User = Models.User;
const attributes = ServerConstants.USER_ATTRIBUTES;

module.exports = {
  searchDocuments(req, res) {
    console.log(colors.yellow('Searching for document...'));
    return Document
      .findAll({
        where: {
          $or: {
            title: {
              $iLike: `%${req.query.q}%`
            },
            access: req.query.q
          }
        }
      })
      .then((documents) => {
        if (!documents) {
          return res.status(404).send({
            message: 'Not found'
          });
        }
        return res.status(200).send({
          documents
        });
      });
  },
  searchUsers(req, res) {
    console.log(colors.yellow('Searching for users...'));
    return User
      .findAll({
        attributes,
        where: {
          $or: [
            {
              fullName: {
                $iLike: `%${req.query.q}%`
              }
            },
            {
              userName: {
                $iLike: `%${req.query.q}%`
              }
            }
          ],
        }
      })
      .then((users) => {
        if (!users) {
          return res.status(404).send({
            message: 'Not found'
          });
        }
        return res.status(200).send({
          users
        });
      });
  }
};