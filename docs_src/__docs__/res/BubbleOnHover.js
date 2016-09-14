import React from 'react';
import Bubble from '../../../lib';

export default class BubbleOnHover extends React.Component {

  state = {
    bubbleDisplayed: false,
  };

  onMouseEnter = () => {
    this.setState({ bubbleDisplayed: true });
  };

  onMouseLeave = () => {
    this.setState({ bubbleDisplayed: false });
  };

  render() {
    const props = {onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave};
    return (
      <div>
        {
          this.state.bubbleDisplayed
          ?
            <span {...props}>Hover me !<Bubble height={80} width={150}>Text inside bubble</Bubble></span>
          :
            <span {...props}>Hover me !</span>
        }
      </div>
    );
  }
}
