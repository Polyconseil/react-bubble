import React, { Component } from 'react';
import PropTypes from 'prop-types';

const STYLE_BASE_ARROW = {
  position: 'absolute',
  width: 0,
  height: 0,
  borderStyle: 'solid',
};

const STYLE_LEFT_ARROW = {
  right: '100%',
  top: 5,
  borderTopWidth: 0,
  borderTopColor: 'transparent',
  borderRightWidth: 10,
  borderRightColor: 'rgb(32,166,181)',
  borderBottomWidth: 10,
  borderBottomColor: 'transparent',
  borderLeftWidth: 0,
  borderLeftColor: 'transparent',
};

const STYLE_RIGHT_ARROW = {
  left: '100%',
  top: 5,
  borderTopWidth: 10,
  borderTopColor: 'rgb(32,166,181)',
  borderRightWidth: 10,
  borderRightColor: 'transparent',
  borderBottomWidth: 0,
  borderBottomColor: 'transparent',
  borderLeftWidth: 0,
  borderLeftColor: 'transparent',
};

const STYLE_ARROW = {
  left: {...STYLE_BASE_ARROW, ...STYLE_LEFT_ARROW},
  right: {...STYLE_BASE_ARROW, ...STYLE_RIGHT_ARROW},
};

const STYLE_CONTAINER = {
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: 'rgb(238, 238, 238)',
  minHeight: 70,
  display: 'flex',
  boxShadow: 'rgba(0, 0, 0, 0.2) 2px 0px 10px 2px',
  borderRadius: 2,
};

const STYLE_BAR = {
  width: 10,
  backgroundColor: 'rgb(32,166,181)',
  position: 'relative',
};

class BubblePortal extends Component {
  displayName = 'ReactBubblePortal';

  static propTypes = {
    // Injected by Bubble
    parentNode: PropTypes.object,

    // Component props
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    maxDistanceBeforeCorrect: PropTypes.number.isRequired,
    children: PropTypes.any,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    customArrowRenderWithDelta: PropTypes.func,
    arrowMargin: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  }

  state = {
    arrowType: 'left',
    containerStyle: {},
    arrowStyle: {},
  }

  componentWillMount = () => {
    this.defineContainerPosition();
  }

  componentWillReceiveProps(newProps) {
    this.defineContainerPosition(newProps);
  }

  /**
   * Compute the element position with scroll and offset
   */
  getElementPosition = (el) => {
    const rect = el.getBoundingClientRect();
    const { top, left, right, bottom, width } = rect;
    const isBody = el.tagName === 'body';
    const offset = isBody ? { top: 0, left: 0 } : null;
    const scroll = isBody ? document.documentElement.scrollTop || document.body.scrollTop : el.scrollTop;
    const dimensions = isBody ? { width: window.width, height: window.height } : null;
    return {
      top,
      right,
      bottom,
      left,
      width,
      scroll,
      ...dimensions,
      ...offset,
    };
  };

  /**
   * Define the container position from the parent and check if the parent is still visible
   */
  defineContainerPosition = (props = this.props) => {
    if (!props.parentNode) return;

    const {
      containerStyle,
      arrowStyle,
    } = this.calculateBubbleAndArrowPositions(props);

    this.setState({
      containerStyle,
      arrowStyle,
    });
  }

  /**
   * Calculate the bubble position
   * Multiple position fixes are made here
   */
  calculateBubbleAndArrowPositions = (props) => {
    const parentPosition = this.getElementPosition(props.parentNode);

    // Initial container positionning (right of parent container)
    const containerStyle = {
      ...STYLE_CONTAINER,
      ...(props.style.container || {}),
      top: parentPosition.top,
      left: parentPosition.left + parentPosition.width + props.arrowMargin,
      width: props.width,
      height: props.height,
    };

    let arrowType = 'left';

    // Move the bubble to the correct place
    const rootPosition = this.getElementPosition(document.body);

    // Move the bubble to the left
    if (parentPosition.right + this.props.width + this.props.maxDistanceBeforeCorrect >= rootPosition.right) {
      containerStyle.left = parentPosition.left - this.props.width - this.props.arrowMargin;
      containerStyle.flexDirection = 'row-reverse';
      arrowType = 'right';
    }

    // Initial arrow positionning (left, no delta)
    let arrowStyle = {
      ...STYLE_ARROW[arrowType],
      ...(props.style.arrow || {})[arrowType],
    };

    // Delta top
    const deltaTop = (parentPosition.top + this.props.height + this.props.maxDistanceBeforeCorrect) - rootPosition.bottom;
    if (deltaTop >= 0) {
      const newTop = containerStyle.top - deltaTop;
      const bubbleFixedToParentBottom = newTop + this.props.height < parentPosition.bottom;
      containerStyle.top = bubbleFixedToParentBottom ? parentPosition.bottom - this.props.height : newTop;
      arrowStyle =
        // Custom arrow delta render
        this.props.customArrowRenderWithDelta && typeof this.props.customArrowRenderWithDelta === 'function'
          ? this.props.customArrowRenderWithDelta(arrowStyle, deltaTop, arrowType, bubbleFixedToParentBottom)
          : this.renderArrowWithDelta(arrowStyle, deltaTop, arrowType, bubbleFixedToParentBottom);
    }

    return {containerStyle, arrowStyle};
  }

  reverseArrowProperties = (arrowProperties, direction) => {
    if (direction === 'left') {
      return {
        ...arrowProperties,
        // Reverse right/left width, both become transparent
        borderRightColor: 'transparent',
        borderRightWidth: arrowProperties.borderLeftWidth,
        borderLeftColor: 'transparent',
        borderLeftWidth: arrowProperties.borderRightWidth,
        // Bottom takes right color
        borderBottomColor: arrowProperties.borderRightColor,
      };
    } else if (direction === 'right') {
      return {
        ...arrowProperties,
        borderTopColor: 'transparent',
        borderLeftWidth: arrowProperties.borderRightWidth,
        borderLeftColor: arrowProperties.borderTopColor,
        borderRightWidth: arrowProperties.borderLeftWidth,
      };
    }
    return arrowProperties;
  }

  renderArrowWithDelta = (arrowStyle, deltaTop, arrowType, bubbleFixedToParentBottom) => {
    arrowStyle.top = bubbleFixedToParentBottom ? this.props.height - 15 : deltaTop;

    // Revert arrow when the delta is more important than half height of bubble
    if (5 + deltaTop >= (this.props.height / 2)) {
      arrowStyle = this.reverseArrowProperties(arrowStyle, arrowType);
    }

    return arrowStyle;
  }

  render() {
    const barStyle = {...STYLE_BAR, ...(this.props.style.bar || {})};
    return (
      <div
        style={this.state.containerStyle}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}>
        <div style={barStyle}>
          <div style={this.state.arrowStyle} />
        </div>
          {this.props.children}
      </div>
    );
  }
}

export default BubblePortal;
