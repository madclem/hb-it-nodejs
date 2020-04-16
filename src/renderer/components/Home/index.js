import {
  Link,
  useRouteMatch
} from "react-router-dom";

import React from 'react'

export default function Home () {
  let match = useRouteMatch();
  return (
    <div> 
      <h2>Home</h2>
      <div>

        <Link to="/offline">Use offline</Link>
      </div>
    </div>
  )
}