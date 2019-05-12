import React, {Component, Item} from 'react';
import data from '../api/index'

class DisplayImgs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    }
    this.getAllImages = this.getAllImages.bind(this);
  }

  async getAllImages() {
    console.log("about to get imgs")
    let imageStrings = await data.get(`/api/question/getAllImages`);
    console.log(imageStrings);
    let imageStrs = [];

    for(let i = 0;i<imageStrings.data.length;i++){
        imageStrs.push("data:image/jpeg;base64," + imageStrings.data[i]);
    }
    this.setState({data: imageStrs});
  }

  async componentDidMount() {
    console.log("imgs did mount");
    await this.getAllImages();
  }

  render() {
    let images = this.props.images;
    let imgs = [];

    if (this.state.data !== undefined) {
      for (let img in images) { 
        imgs.push(
          <div>
            <img alt="a screenshot" src={img}/>
          </div>
        )
      }
    } else {
      imgs.push(
        <p>
          weh no imgs found
        </p>
      )
    }

    return (
      <div>
        {imgs.map((item, index) => (
          <Item key={index} item={item}/>
        ))}
        {imgs}
      </div>
  )};
}

export default DisplayImgs;