import React from "react"

const GraphScale = (props) => {
    const gridRows = []
    for (let i = 0; i < 10; i++) {
        gridRows.push(
            <div key = {i} className="graph-grid-row">
                <p>
                    {Math.floor(props.max - props.max * (i / 10))}
                </p>
            </div>
        )
    }
    
    return (
        // <ul className = "graph-scale">
        //     <li>{props.max}</li>
        //     <li>{props.max}</li>
        //     <li>{props.max}</li>
        // </ul>
        <div className = "graph-scale">
            {gridRows}
        </div>
    )
}

export default GraphScale