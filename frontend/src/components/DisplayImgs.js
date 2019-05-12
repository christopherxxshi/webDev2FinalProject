import React, {Component, Item} from 'react';
import data from '../api/'

class DisplayImgs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.getAllImages = this.getAllImages.bind(this);
  }

  async getAllImages() {
    console.log("about to get imgs")
    let resData = await data.get(`/api/image/getAllImages`);
    console.log(resData);
    let imageStrs = [];

    for (let i = 0;i<resData.data.length;i++) {
        imageStrs.push("data:image/jpeg;base64, " + resData.data[i].img);
    }

    this.setState({ data: imageStrs });
  }

  async componentDidMount() {
    console.log("imgs did mount");
    await this.getAllImages();
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.data.map(item => (
            <li key={item}> <img src={item} alt="a screenshot"/> </li>
          ))}
        </ul>
      </div>
  )};
}

export default DisplayImgs;