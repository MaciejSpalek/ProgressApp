import React from 'react'
import styled from 'styled-components'
import Paragraph from '../../../Components/paragraph'
import { FlexComponent } from '../../../Components/styleHelpers'
import { faLevelUpAlt, faLevelDownAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledContainer = styled(FlexComponent)`
    padding: 0;
`

const ProgressSign = ({ percents }) => {
    const progressObj = () => {
        if(percents > 0) {
            return {
                color: "green",
                icon: faLevelUpAlt
            }
        } else if (percents === 0) {
            return {
                color: "black",
            }
        } else {
            return {
                color: "red",
                icon: faLevelDownAlt
            }
        }
    }
    
    return (
        <StyledContainer>
            {percents !== 0 ? <FontAwesomeIcon 
                icon={progressObj().icon} 
                style={{
                    color: progressObj().color,
                    fontSize: 20,
                    marginRight: ".2em"
                }}
            /> : null}
            <Paragraph 
                text={`${percents}%`}
                fontWeight={"bold"}
                fontSize={"1.2em"}
                color={progressObj().color}
                
            />
        </StyledContainer>
    )
}

export default ProgressSign;