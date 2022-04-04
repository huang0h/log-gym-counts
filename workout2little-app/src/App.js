import './App.css';
import Graph from "./components/Graph"
import Form from "./components/Form"

import {useState, useEffect} from "react"
import {locationsArr, timesArr, processDates} from "./external"

function App() {
	// state to determine the range within which to 
	// obtain data from and for what location
	// state will be an array of two objects, both of which contain
	// a month, day, and year field - first is start, second is end
	const [searchQuery, setSearchQuery] = useState({
		location: "",
		// placeholder values
		start: {
			month: -1,
			day: -1,
			year: -1
		}, end: {
			month: -1,
			day: -1,
			year: -1
		}
	})


	return (
		<div className="App">
			<Graph />
			<Form 
			// give Form the ability to manipulate the App's search query
			passSearchQuery = {setSearchQuery} />
		</div>
	);
}

export default App;