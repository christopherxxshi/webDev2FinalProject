import {React, Component} from 'react';

class DisplayImgs extends Component {

  async componentDidMount() {
    await this.props.displayQuestions();
  }

  render() {
    return (
      <div>

      </div>
  )};
}

export default DisplayImgs;