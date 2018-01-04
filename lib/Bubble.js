import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import BubblePortal from './BubblePortal';
const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

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

  componentDidMount() {
    // Create the node and render the portal
    this.node = document.createElement('div');
    this.node.className = 'ReactBubble';
    document.body.appendChild(this.node);
    this.renderPortal(this.props);

    // Attach event using capture
    document.addEventListener('scroll', this.handlerEvent, true);
    window.addEventListener('resize', this.handlerEvent, true);
  }

  componentWillReceiveProps(newProps) {
    this.renderPortal(newProps);
  }

  componentWillUnmount() {
    // Remove event and destroy the node
    document.removeEventListener('scroll', this.handlerEvent, true);
    window.removeEventListener('resize', this.handlerEvent, true);
    ReactDOM.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  }

  handlerEvent = () => {
    this.renderPortal(this.props);
  }

  renderPortal(props) {
    const parentNode = ReactDOM.findDOMNode(this).parentNode;
    this.portal = renderSubtreeIntoContainer(this, <BubblePortal {...props} parentNode={parentNode} />, this.node);
  }

  render() {
    return React.DOM.noscript();
  }
}

export default Bubble;
