import {useState, useEffect} from "react"
import InputButton from "./InputButton"
import GraphBar from "./GraphBar"
import GraphScale from "./GraphScale"
import { hours, daysArr } from "../external"
import '../Graph.css'

const Graph = (props) => {
    const {info, passSelectedDay} = props
    const [dayButtons, setDayButtons] = useState(daysArr)

    function toggleDayButtons(event) {
        const newValues = []
        dayButtons.forEach(day => {
            newValues.push({
                ...day,
                isSelected: event.target.name === day.value
            })
        })
        setDayButtons(newValues)
        passSelectedDay(event.target.name)
    }

    return (
        <div className = "graph">
            {info.counts.length <= 0 ? 
            <h1>Select a location, timeframe, and day to get started!</h1>
            :
            <div className = "graph-bars">
                <GraphScale max = {info.max} />
                {
                    info.counts.map((count, index) => {
                        return <GraphBar key = {index} count = {count} max = {info.max} label = {hours[index]} />
                    })
                }
            </div>
            }
            <div className="buttons">
                {dayButtons.map(day => 
                    <InputButton key={day.id}
                        name={day.value}
                        isSelected={day.isSelected}
                        onClick={toggleDayButtons}
                        purpose="weekday"
                    />
                )}
            </div>
        </div>
    )
}

export default Graph;