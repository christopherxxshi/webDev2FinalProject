import React, {Component} from 'react';

/**
 * Notes to self: I think the move here is to:
 * save the photo locally https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
 * process with imageMagick, export to destination folder
 * put to mongoDB
 * 
 * https://medium.com/@colinrlly/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed
 * https://www.mkyong.com/mongodb/java-mongodb-save-image-example/
 * 
 * JK actually
 * get photo
 * save to mongodb as binary
 * pull from mongodb and process the binary in imagemagick
 * 
 * https://codeburst.io/image-uploading-using-react-and-node-to-get-the-images-up-c46ec11a7129
 * https://github.com/drminnaar/noteworx-react-mongodb
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