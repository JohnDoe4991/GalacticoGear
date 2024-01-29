import React from 'react';
import '../CSS/mycss.css';

function Tooltip(props) {
    const { text, children } = props;
    return (
        <div className="tooltip">
            {children}
            <span className="tooltiptext">{text}</span>
        </div>
    );
}

export default Tooltip;
