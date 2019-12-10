import React, { Component } from 'react';
import { PrimaryButton } from '../../shared/office';

export class ImageModalDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {

  }

  componentWillUnmount() {

  }
  render() {
    const { hidePasteImageModal, imageBase64, sendImageAsAttachment } = this.props;
    return (
      <div className="image-overlay">
        <img src={imageBase64} alt="screenshot"></img>
        <div className="image-btn-group">
          <PrimaryButton
            onClick={sendImageAsAttachment}
            className="image-btn send"
            text="Send"
          />
          <PrimaryButton
            onClick={hidePasteImageModal}
            className="image-btn cancel"
            text="Cancel"
          />
        </div>
      </div>);
  }
}