import React from "react"
import Data from '../../Components/data'
import ArrowButton from '../../Components/arrowButton'
const getText =(bodyPartName, variable) => {
    if(variable != "") {
        return `${bodyPartName}: ${variable}cm`;
    } else {
        return `${bodyPartName}: -`;
    }
}

const SaveBox = ({
    neck,
    chest,
    biceps,
    forearm,
    waist,
    thigh,
    calf
}) => {
    return (
        <div className="saveBox">
            <div className="saveBox__header">
                <Data/>
                <ArrowButton rotationDegree={0}/>
            </div>
            <div className="saveBox__content">
                <span className="saveBox__item">{getText("Neck", neck)}</span>
                <span className="saveBox__item">{getText("Chest", chest)}</span>
                <span className="saveBox__item">{getText("Biceps", biceps)}</span>
                <span className="saveBox__item">{getText("Forearm", forearm)}</span>
                <span className="saveBox__item">{getText("Waist", waist)}</span>
                <span className="saveBox__item">{getText("Thigh", thigh)}</span>
                <span className="saveBox__item">{getText("Calf", calf)}</span>
            </div>
        </div>
    )
}

export default SaveBox;