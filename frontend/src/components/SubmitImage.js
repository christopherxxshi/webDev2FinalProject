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
  state = {
    imgFile: null
  }

  fileChangedHandler = (event) => {
    this.setState({ imgFile: event.target.files[0] });
  }

  uploadHandler = () => {
    console.log(this.state.imgFile.size);
    if (this.state.imgFile.size / 1024 / 1024 >  3) {
      // imageMagick
      alert("File toooo large");
    } else {
      // can just upload
    }
  }

  render() {
    return(
      <div>
        <input type="file" onChange={this.fileChangedHandler}/>
        <button onClick={this.uploadHandler}>Upload!</button>
      </div>
    )
  }
}

export default SubmitImage;