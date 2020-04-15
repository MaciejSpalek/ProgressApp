import React, { Component } from 'react'
import styled from 'styled-components'
import { variables, flexCenter, FlexComponent } from '../../../Components/styleHelpers'
import TogglePanel from '../../../Components/togglePanel';
import Content from './content';


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
    // "backgroundColor": "white",
    "backgroundColor": `${variables.$lightOrange}`,
    "margin": ".25em .25em 0",
    "width": "calc(100% - .5em)",
    "borderRadius": ".3em",
    "borderBottomLeftRadius": "0",
    "borderBottomRightRadius": "0",
    // "border": `.2em solid ${variables.$grayBlue}`,
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

    render() {
        const { name } = this.props;
        const { isHidden } = this.state;
        
        
        return (
            <Container isHidden={isHidden}>
                <TogglePanel 
                    handleFunction={()=> this.handleArrowButton()} 
                    buttonBackgroundColor={variables.$grayBlue}
                    flexStyles={!isHidden ? modifyToggleStyles: toggleStyles}
                    arrowColor={"white"}
                    isHidden={isHidden}
                    text={name}   
                />
                {!isHidden ? <Content /> : null}
            </Container>
        )
    }
}

export default exercise
