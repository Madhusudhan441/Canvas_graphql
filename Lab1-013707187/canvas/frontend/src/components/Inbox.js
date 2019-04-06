import React, { Component } from 'react'
import Navbar from './Navbar'
export default class Inbox extends Component {
  render() {
    return (
      <div>
        <div className='container contmain' >
                    <div class="row rowC"></div>
                    <div class='col col-sm-2'>
                        <Navbar />
                    </div>
                <div class = "col col-sm-3">
                    <h2>Message</h2>
                    </div>
                <div class = "col col-sm-4">
                <h2>Messages</h2>

                </div>
                    </div>
      </div>
    )
  }
}
