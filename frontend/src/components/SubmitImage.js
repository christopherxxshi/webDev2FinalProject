import React, {Component} from 'react';

/**
 * Ended up sending entire image to server and processing there
 */

class SubmitImage extends Component {
  constructor(props) {
    super(props);

    this.uploadHandler = this.uploadHandler.bind(this);
  }

  uploadHandler = async (event) => {
    event.preventDefault();
    
    let formData = new FormData();
    formData.append('imgFile', this.uploadInput.files[0]);
    // console.log(formData);

    if (this.uploadInput.files[0].size / 1024 / 1024 >  3) {
      // Post to resize route
      // console.log("Resize route");
      await fetch('http://localhost:3001/api/image/resizeImg', {
        method: 'POST',
        body: formData
      });
      // console.log("Upload done");
    } else {
      // Can just upload
      // console.log("Straight upload route");
      try {
        await fetch('http://localhost:3001/api/image/uploadImg', {
          method: 'POST',
          body: formData
        });
        // console.log("Upload done");
      } catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    return (
      <form onSubmit={this.uploadHandler}>
        <div>
          <input ref={(ref) => { this.uploadInput = ref;}} type="file"/>
          <button>Upload</button>
        </div>
      </form>
    );
  }
}

export default SubmitImage;