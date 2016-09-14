import React from 'react';
import Bubble from '../../lib/Bubble.js';

export const overview = require('!!raw!../../README.md');
export const documentedComponents = {Bubble};
export const source = require('!!raw!../../lib/Bubble.js');

export class Explorer extends React.Component {
    render() {
      return(
        <div>
          <span>
            A feature of your app
            <Bubble width={250} height={50}>
              <div style={{ padding: 10 }}>
                Bubble as a tooltip to explain the feature to your users
              </div>
            </Bubble>
          </span>
        </div>
      );
    }
}
