import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import BubblePortal from './BubblePortal';

class Bubble extends Component {
  displayName = 'Bubble';

  static propTypes = {
    /** Width of the bubble */
    width: PropTypes.number.isRequired,
    /** Height of the bubble */
    height: PropTypes.number.isRequired,
    /** Maximum distance between bubble border and window border before correcting position */
    maxDistanceBeforeCorrect: PropTypes.number,
    /** Margin between the bubble and the sibling element */
    arrowMargin: PropTypes.number,

    /** Custom event, can be used to maintain bubble visible on hover */
    onMouseEnter: PropTypes.func,
    /** Custom event, can be used to maintain bubble visible on hover */
    onMouseLeave: PropTypes.func,

    /** Custom functions */
    customArrowRenderWithDelta: PropTypes.func,

    /** See the "style" part */
    style: PropTypes.object,
    children: PropTypes.any,
  }

  static defaultProps = {
    maxDistanceBeforeCorrect: 10,
    arrowMargin: 15,
    style: {
      container: {},
      arrow: {
        left: {},
        right: {},
      },
    },
  }

  state = {
    parentNode: null,
  }

  componentDidMount() {
    // Create the node and render the portal
    this.node = document.createElement('div');
    this.node.className = 'ReactBubble';
    document.body.appendChild(this.node);

    const parentNode = ReactDOM.findDOMNode(this).parentNode;
    if (!parentNode) {
      console.error('Unable to find parent node of <Bubble /> component');
    }
    this.setState({ parentNode });

    // Attach event using capture
    document.addEventListener('scroll', this.updateBubblePosition, true);
    window.addEventListener('resize', this.updateBubblePosition, true);
  }

  componentWillUnmount() {
    // Remove event and destroy the node
    document.removeEventListener('scroll', this.updateBubblePosition, true);
    window.removeEventListener('resize', this.updateBubblePosition, true);
    document.body.removeChild(this.node);
  }

  bubble: ?any;
  attachBubbleRef = (node) => {
    this.bubble = node;
  }
  updateBubblePosition = () => {
    if (!this.bubble) return;
    this.bubble.defineContainerPosition();
  }

  render() {
    const { parentNode } = this.state;
    if (!parentNode || !this.node) {
      // DO NOT RETURN NULL ! componendDidMount() would not trigger
      return <noscript />;
    }
    return ReactDOM.createPortal(
      <BubblePortal {...this.props} ref={this.attachBubbleRef} parentNode={parentNode} />,
      this.node,
    );
  }
}

export default Bubble;
