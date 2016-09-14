import React, { Component } from 'react';
import Bubble from '../../lib';
import BubbleOnHover from './res/BubbleOnHover';

export class Explorer extends Component {
  render() {
    const text = 'Some text to render in bubble';
    return (
      <div style={{backgroundColor: '#FFFFFF', overflow: 'hidden'}}>
        <div style={{maxHeight: 500, overflow: 'auto', marginTop: 50}}>
          <div style={{backgroundColor: 'grey', paddingTop: 100, height: 1400}}>
            <BubbleOnHover />
            <div style={{marginTop: 50}}>
              <BubbleOnHover />
            </div>
            <div style={{marginTop: 50}}>
              <BubbleOnHover />
            </div>
          </div>
        </div>
        <div style={{backgroundColor: 'green', textAlign: 'right', marginTop: 50, height: 100}}>
          <BubbleOnHover />
        </div>
        <div style={{maxWidth: 500, marginTop: 50, backgroundColor: 'red', overflow: 'auto', height: 100}}>
          <div style={{width: 2000, paddingLeft: 450}}>
            <BubbleOnHover />
          </div>
        </div>
        <BubbleOnHover />
        <div style={{textAlign: 'right'}}>
          <BubbleOnHover />
        </div>
        <div style={{maxHeight: 300, overflow: 'auto'}}>
          <div style={{height: 1000, position: 'relative'}}>
            <div style={{position: 'absolute', bottom: 0}}>
              <BubbleOnHover />
            </div>
          </div>
        </div>
        <BubbleOnHover />
      </div>
    );
  }
}
