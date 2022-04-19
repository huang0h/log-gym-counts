import {useState} from "react"
import {motion} from "framer-motion"
import HoverFlag from "./HoverFlag"
import { useMousePosition } from "../external"

const GraphBar = (props) => {
    const {count, max, label} = props
    const pctMax = (count / max) * 100
    const [flag, setFlag] = useState(false)

    return (
        <motion.div className="graph-bar" 
        animate = {{height: `${pctMax}%`}} transition = {{ease: "easeInOut"}}
        onMouseEnter = {() => setFlag(true)}
        onMouseLeave = {() => setFlag(false)}
                    >
            <p className = "bar-label bar-label-time">
                {label}
            </p>
            {count > 0 && <p className = "bar-label bar-label-count">
                {count}
            </p>}
            {/* <HoverFlag count = {count} max = {max} className = {flag ? "flag-show" : "flag-hide"}
            position = {useMousePosition()} /> */}
        </motion.div>
    )
}

export default GraphBar