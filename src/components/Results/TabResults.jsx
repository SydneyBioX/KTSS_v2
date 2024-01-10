import React from 'react'
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"

const TabResults = () => {
  return (
    <Tabs
      defaultActiveKey="CurrentOffer"
      id="uncontrolled-tab-example"
      className="mb-3">
        <Tab eventKey = "CurrentOffer" title = "CurrentOffer">

        </Tab>
        <Tab eventKey = "SecondOffer" title = "SecondOffer">
            
        </Tab>
        <Tab eventKey = "ThirdOffer" title = "ThirdOffer">
            
        </Tab>

    </Tabs>
  )
}

export default TabResults