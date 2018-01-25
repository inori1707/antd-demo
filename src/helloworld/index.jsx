import React from 'react'

import './style/index.scss'

export class HelloMessage extends React.Component {
  render() {
    return <div>Hello <span className='name'>{this.props.name}</span></div>
  }
}
