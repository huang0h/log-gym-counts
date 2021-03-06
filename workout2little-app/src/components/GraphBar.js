import {motion} from "framer-motion"

const GraphBar = (props) => {
    const {count, max, label} = props
    const pctMax = (count / max) * 100

    return (
        <motion.div className="graph-bar" 
        animate = {{height: `${pctMax}%`}} transition = {{ease: "easeInOut"}}
        // onMouseEnter = {() => setFlag(true)}
        // onMouseLeave = {() => setFlag(false)}
                    >
            <p className = "bar-label bar-label-time">
                {label}
            </p>
            <p className = "bar-label bar-label-count">
                {count <= 0 ? "N/A" : count}
            </p>
            {/* <HoverFlag count = {count} max = {max} className = {flag ? "flag-show" : "flag-hide"}
            position = {useMousePosition()} /> */}
        </motion.div>
    )
}

export default GraphBar