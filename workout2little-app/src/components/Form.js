import {useState} from "react"
import LocationButton from "./LocationButton"

const Form = (props) => {
    const [locations, setLocations] = useState(locationsArr)

    /*
        function to toggle which location is currently selected
    */
    function toggleSelected(event) {
        const newLocations = []
        locations.forEach(location => {
            console.log(event.target.name, location)
            newLocations.push({
                ...location,
                isSelected: event.target.name === location.location
            })
        })
        console.log(newLocations)
        setLocations(newLocations)
    }

    return (
        <div className = "form">
            <h2>
                Displaying data for:
            </h2>
            <div className = "input-grid input-buttons">
                {locations.map((location) => {
                    return (
                        <LocationButton key={location.id}
                        name={location.location}
                        isSelected={location.isSelected}
                        toggle = {toggleSelected}
                        />
                    )
                })}
            </div>
        </div>
    )
}

const locationsArr = [
    {
        id: 0,
        location: "Marino Center - 2nd Floor",
        isSelected: false
    },
    {
        id: 1,
        location: "Marino Center - Gymnasium",
        isSelected: false
    },
    {
        id: 2,
        location: "Marino Center - 3rd Floor Weight Room",
        isSelected: false
    },
    {
        id: 3,
        location: "Marino Center - 3rd Floor Select & Cardio",
        isSelected: false
    },
    {
        id: 4,
        location: "Marino Center - Track",
        isSelected: false
    },
    {
        id: 5,
        location: "SquashBusters - 4th Floor",
        isSelected: false
    }
]

export default Form;