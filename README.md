# react-bubble

A simple and customizable bubble for react

# Exemple

```javascript
<span>
  Text to bubble
  <Bubble width={320} height={100}>
    Content Test
  </Bubble>
</span>
```

# Installation

```
npm install --save react-bubble
```

# Props

| Name                       | Type     | Required | Default value      | Description
|:---------------------------|:--------:|:--------:|:------------------:|:------------------------
| width                      | Number   | True     | -                  | Width of the bubble
| height                     | Number   | True     | -                  | Height of the bubble
| arrowMargin                | Number   | False    | 15                 | Margin between the bubble and the sibling element
| maxDistanceBeforeCorrect   | Number   | False    | 10                 | Distance between the bubble border and window border before correcting position
| onMouseEnter               | Function | False    | -                  | Function triggered when entering the bubble
| onMouseLeave               | Function | False    | -                  | Function triggered when leaving the bubble
| customArrowRenderWithDelta | Function | False    | -                  | Function to customize the render of the correction
| style                      | Object   | False    | See the style part | Style object

# Style

If you customize the arrow style, I strongly recommand you to override the delta rendering with customArrowRenderWithDelta since Bubble won't know the logic of the transformation.

### Default props
```javascript
{
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgb(238, 238, 238)',
    minHeight: 70,
    display: 'flex',
    boxShadow: 'rgba(0, 0, 0, 0.2) 2px 0px 10px 2px',
    borderRadius: 2,
  },
  arrow: {
    left: {
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
    },
    right: {
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
    },
  },
  bar: {
    width: 10,
    backgroundColor: 'rgb(32,166,181)',
    position: 'relative',
  },
}
```
