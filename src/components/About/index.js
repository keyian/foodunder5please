// src/components/About/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import './style.css';

import Logo from '../Logo';

export default class About extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('About', className)}>
        <Logo className={classnames('logoSm', className)} />
        <h1>
          About
        </h1>
      </div>
    );
  }
}
