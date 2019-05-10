import React, {Component} from 'react';

/**
 * Notes to self: I think the move here is to save the photo locally ->
 * process with imageMagick, export to destination folder -> put to mongoDB
 */

class SubmitImage extends Component {
  state = {
    imgFile: null
  }

  fileChangedHandler = (event) => {
    this.setState({ imgFile: event.target.files[0] });
  }

  uploadHandler = () => {
    console.log(this.state.imgFile);
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