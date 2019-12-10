import React, { Component } from 'react';
import { PrimaryButton } from '../shared/office';
import { retrieveImageFromClipboardAsBase64 } from './internals/retrieveImageFromClipboardAsBase64';
import { ImageModalDialog } from './internals/imageModalDialog';
import Zmage from 'react-zmage'

export default class CasePanel extends Component {
  constructor(props) {
    super(props);
    const { props: {
      dispatch
    } } = this;
   
    this.attachmentMiddleware = () => next => card => {
      const contentType = card.attachment.contentType;
      const url = card.attachment.contentUrl;
      const name = card.attachment.name;
      return /^image\//u.test(contentType) ?
        (<img src={`${name}`} onClick={() => Zmage.browsing({ src: url })} />) :
        next(card);
    };

    this.state = {
      showPasteImage: false,
      imageBase64Data: ''
    };
    }
  }

  componentDidMount() {   
    window.addEventListener("paste", (event) => {
      // Use thePasteEvent object here ...
      this.thePasteImageEvent(event);
    }, false);
  }

  componentWillUnmount() {    
    // Remove thePasteImageEvent listener
    window.removeEventListener("paste", (event) => {
      this.thePasteImageEvent(event);
    });
  }

  showPasteImageModal = () => {
    this.setState({
      showPasteImage: true
    });
  }
  hidePasteImageModal = () => {
    this.setState({
      showPasteImage: false
    });
  }

  thePasteImageEvent = (event) => {
    // Handle the event
    retrieveImageFromClipboardAsBase64(event, (imageDataBase64) => {
      const { agentAccount } = this.props;
      // If there's an image base64 string, send as attachment
      if (imageDataBase64) {
        this.setState({
          showPasteImage: true,
          imageBase64Data: imageDataBase64
        })
      }
    }, "image/png");
  }

  render() {    
    const { styleSet, showPasteImage, imageBase64Data } = this.state;      
    const { isLoading } = this.props;
    return (
      <div style={{ display: "inline" }}>
        <div id="webchat" className="casePanel-chat">
          {showPasteImage &&
            <ImageModalDialog
              hidePasteImageModal={this.hidePasteImageModal}
              imageBase64={imageBase64Data}
              sendImageAsAttachment={() => this.postActivityWithAttachment(agentAccount, imageBase64Data)}
            />
          }      
        </div>        
        </div>
      </div>
    )
  }
}
