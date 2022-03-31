import './App.css';
import Graph from "./components/Graph"
import Form from "./components/Form"

import {useState, useEffect} from "react"
import {locationsArr, timesArr, processDates} from "./external"

function App() {
	// states to manage the location, time range BUTTONS
	// determine which are on/off
	const [locations, setLocations] = useState(locationsArr)
	const [timeRanges, setTimeRanges] = useState(timesArr)
	// state to determine the range within which to 
	// obtain data from 
	// state will be an array of two objects, both of which contain
	// a month, day, and year field - first is start, second is end
	const [searchRange, setSearchRange] = useState([{}, {}])

	// function to toggle which location is currently selected
	function toggleSelectedLocation(event) {
		const newLocations = []
		locations.forEach(location => {
			newLocations.push({
				...location,
				isSelected: event.target.name === location.location
			})
		})
		setLocations(newLocations)
	}

	// function to toggle which time range is currently selected
	function toggleSelectedRange(event) {
		const newRanges = []
		timeRanges.forEach(range => {
			newRanges.push({
				...range,
				isSelected: event.target.name === range.range
			})
		})
		setTimeRanges(newRanges)
	}

	return (
		<div className="App">
			<Graph />
			<Form 
			toggleSelectedLocation = {toggleSelectedLocation}
			toggleSelectedRange = {toggleSelectedRange} 
			locations = {locations}
			timeRanges = {timeRanges} 
			passSearchRange = {setSearchRange} />
		</div>
	);
}

export default App;