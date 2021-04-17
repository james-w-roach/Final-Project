import React from 'react';

export default class ViewPOI extends React.Component {
  render() {
    return (
      <>
        <ul className="poi-list">
          <li className="poi-list-item">
            <img className="poi-img" src="https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc3NjU2NzQ4NTAwMjk3/this-day-in-history-05311859---big-ben-in-london.jpg"/>
            <div>
              Big Ben <br />
              1234 Big Ben Lane, London, England
            </div>
          </li>
          <li className="poi-list-item">
            <img className="poi-img" src="https://aws-tiqets-cdn.imgix.net/images/content/a438e558bd694b45998600b40b24e185.jpg?auto=format&fit=crop&h=800&ixlib=python-3.2.1&q=70&w=800&s=1ff66dd325c2e90310ca45123d387cf3"/>
            <div>
              Golden Gate Bridge <br />
              San Francisco, CA, US
            </div>
          </li>
          <li className="poi-list-item">
            <img className="poi-img" src="https://aws-tiqets-cdn.imgix.net/images/content/a438e558bd694b45998600b40b24e185.jpg?auto=format&fit=crop&h=800&ixlib=python-3.2.1&q=70&w=800&s=1ff66dd325c2e90310ca45123d387cf3" />
            <div>
              Golden Gate Bridge <br />
              San Francisco, CA, US
            </div>
          </li>
        </ul>
      </>
    );
  }
}
