# react-bubble

A simple and customizable bubble for react

## Example

![Example](https://github.com/Polyconseil/react-bubble/raw/master/examples/images/simple_example.png "Simple bubble")

The bubble points to its parent :

```playground_norender
const Demo = () => (
    <span>
      Text to bubble
      <Bubble width={250} height={80}>
        Content Test
      </Bubble>
    </span>   
);

ReactDOM.render(<Demo />, mountNode);
    
    
```

## Installation

```
npm install --save react-bubble
```

## Style

If you customize the arrow style, I strongly recommend you to override the delta rendering with customArrowRenderWithDelta since Bubble won't know the logic of the transformation.

### Default style properties

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

## Props
