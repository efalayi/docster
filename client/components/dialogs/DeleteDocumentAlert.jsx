import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {red500} from 'material-ui/styles/colors';
import { muiTheme1, muiTheme2 } from '../../muiTheme';
import { deleteDocument } from '../../actions/DeleteDocument';

/**
 * @class CreateDocumentDialog
 * @extends {React.Component}
 */
class DeleteDocumentAlert extends Component {

  /**
   * Creates an instance of CreateDocumentDialog.
   * @param {any} props 
   * @memberof CreateDocumentDialog
   */
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      document: this.props.document
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  /**
   * @memberof CreateDocumentDialog
   * @returns {void}
   */
  deleteDocument() {
    this.props.deleteDocument(this.state.document);
    this.setState({
      open: false
    });
  }

  /**
   * @memberof CreateDocumentDialog
   * @returns {void}
   */
  closeDialog() {
    this.setState({open: false});
  }

  /**
   * @memberof CreateDocumentDialog
   * @returns {void}
   */
  openDialog() {
    this.setState({open: true});
  }

  /**
   * @memberof CreateDocumentDialog
   * @returns {object} dialog
   */
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.closeDialog}
      />,
      <RaisedButton
        label="delete document"
        secondary
        keyboardFocused
        onTouchTap={this.deleteDocument}
      />,
    ];
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme1}>
          <IconButton
            onClick={this.openDialog}
          >
            <ActionDelete color={red500} />
          </IconButton>
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={muiTheme2}>
          <div className="container">
            <Dialog
              title={`Delete document: ${this.state.document.title}`}
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent
            >
              <h5>Are you sure you want to delete this document?</h5>
            </Dialog>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

DeleteDocumentAlert.propTypes = {
  document: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    documents: state.documents
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteDocument: bindActionCreators(deleteDocument, dispatch)
  };
}
export default 
  connect(mapStateToProps, mapDispatchToProps)(DeleteDocumentAlert);