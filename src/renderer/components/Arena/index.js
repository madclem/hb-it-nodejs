import { Link, useLocation } from "react-router-dom";
import React, { useEffect } from 'react';

import { ArenaApp } from './ArenaApp';

export function Arena(props) {

  const location = useLocation();

  useEffect(() => {
    console.log(location, location.state)
    // Update the document title using the browser API
    let arenaApp = new ArenaApp(location.state ? location.state.devices : []);

  }, []);

  return (
    <div style={{position:'absolute'}}>
      <Link to='/'>Back</Link>
    </div>
  );
}
