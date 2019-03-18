import React, { Component } from 'react'

export default class Chome extends Component {

  render() {
    return (
      <div>
        <h2>CMPE {localStorage.getItem('courseid')} - Spring 19</h2>
        <div class="space"></div>
        <p>Content goes here</p>
      </div>
    )
  }
}
