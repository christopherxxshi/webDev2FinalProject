import {React, Component} from 'react';
import {getAllImages} from '../action';
import { connect } from "react-redux";

class DisplayImgs extends Component {

  async componentDidMount() {
    await this.props.getAllImages();
  }

  render() {
    let images = this.props.images;
    let imgs = [];

    if (this.props.images !== undefined) {
      for (let img in images) {
        imgs.push(
          <div>
            <img alt="a screenshot" src={img}/>
          </div>
        )
      }
    }
    return (
      <div>
        {images}
      </div>
  )};
}

const mapStateToProps = (state) => {
  var arr = [];
  for (let prop in state.images.image) {
      arr.push(state.images.image[prop]);
  }

  return {
      images: arr
  };
}

export default connect(mapStateToProps, {getAllImages})(DisplayImgs);