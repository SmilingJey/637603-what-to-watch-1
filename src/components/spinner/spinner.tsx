import * as React from 'react';

const Spinner = (props) => {
  return <div className="lds-spinner-container" style={...props.style}>
    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div>
    </div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>;
};

export default Spinner;
