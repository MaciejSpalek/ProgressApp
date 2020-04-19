import React, { Component } from 'react'
import styled from 'styled-components'
import { variables, flexCenter, FlexComponent } from '../../../Components/styleHelpers'
import TogglePanel from '../../../Components/togglePanel';
import Content from './content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart, faDumbbell, faEllipsisV } from '@fortawesome/free-solid-svg-icons';


const toggleStyles = {
    "justifyContent": "space-between",
    "backgroundColor": "white",
    "margin": ".25em .25em 0",
    "width": "calc(100% - .5em)",
    "borderRadius": ".3em",
    "borderBottomLeftRadius": ".3em",
    "borderBottomRightRadius": ".3em",
}

const modifyToggleStyles = {
    "justifyContent": "space-between",
    "backgroundColor": `${variables.$lightOrange}`,
    "margin": ".25em .25em 0",
    "width": "calc(100% - .5em)",
    "borderRadius": ".3em",
    "borderBottomLeftRadius": "0",
    "borderBottomRightRadius": "0",
    "borderBottom": "none"
}

const Container = styled.div`
    ${flexCenter}
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
`

class exercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true
        }
    }
    handleArrowButton() {
        this.setState( prevState => ({
            isHidden: !prevState.isHidden
        }))
    }

    setExerciseIcon(radioValue) {
        if(radioValue === "repsWithWeight") {
            return faDumbbell;
        } else if(radioValue === "repsWithoutWeight") {
            return faEllipsisV;
        } else {
            return faHourglassStart;
        }
    }

    render() {
        const { name, type, exerciseKey, planKey, currentSeries, currentTraining } = this.props;
        const { isHidden } = this.state;
        return (
            <Container isHidden={isHidden}>
                <TogglePanel 
                    handleFunction={()=> this.handleArrowButton()} 
                    buttonBackgroundColor={variables.$grayBlue}
                    buttonColor={"white"}
                    flexStyles={!isHidden ? modifyToggleStyles: toggleStyles}
                    isHidden={isHidden}
                    text={name}  
                    textFontSize={"1.3em"}
                    iconName={this.setExerciseIcon(type)} 
                    iconColor={variables.$grayBlue}
                    iconFontSize={25}
                />
                {!isHidden ?    <Content 
                                    type={type} 
                                    planKey={planKey}
                                    exerciseKey={exerciseKey}
                                    currentSeries={currentSeries}
                                    currentTraining={currentTraining}
                                /> : null}
            </Container>
        )
    }
}

export default exercise
