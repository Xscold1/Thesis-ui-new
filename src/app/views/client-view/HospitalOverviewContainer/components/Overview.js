import React from 'react'

function Overview(props) {
  return (
    <div className="overview__main__content">
      <div className='alignment'>
        <p className='overview_text'>{props.overview}</p>
      </div>
    </div>
  )
}

export default Overview