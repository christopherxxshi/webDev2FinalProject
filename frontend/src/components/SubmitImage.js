import React, {Component} from 'react';

/**
 * Ended up sending entire image to server and processing there
 */

class SubmitImage extends Component {
  constructor(props) {
    super(props);

    this.uploadHandler = this.uploadHandler.bind(this);
  }

  // fileChangedHandler = (event) => {
  //   this.setState({ imgFile: event.target.files[0] });
  //   console.log(this.state.imgFile);
  // }

  uploadHandler = async (event) => {
    event.preventDefault();
    
    let formData = new FormData();
    console.log("about to append ", this.uploadInput.files[0]);
    formData.append('imgFile', this.uploadInput.files[0]);

    if (this.uploadInput.files[0].size / 1024 / 1024 >  3) {
      // Post to resize route
      console.log("Resize route");
      await fetch('http://localhost:3001/api/question/resizeImg', {
        method: 'POST',
        body: formData
      });
      console.log("Upload done");
    } else {
      // can just upload
      console.log("Straight upload route");
      try {
        await fetch('http://localhost:3001/api/question/uploadImg', {
          method: 'POST',
          body: formData
        });
        console.log("Upload done");
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
      // <div>
      //   <input type="file" value={this.state.imgFile} onChange={this.fileChangedHandler}/>
      //   <button onClick={this.uploadHandler.bind(event)}>Upload!</button>
      // </div>
    );
  }
}

export default SubmitImage;