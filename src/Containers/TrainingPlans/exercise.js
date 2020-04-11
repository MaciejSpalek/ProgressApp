import React, { Component } from 'react'
import styled from 'styled-components'
import { variables, flexCenter, FlexComponent } from '../../Components/styleHelpers'
import TogglePanel from '../../Components/togglePanel';

const toggleFlexStyles = {
    "justifyContent": "space-between",
    "backgroundColor": "white"
}

const Container = styled.div`
    ${flexCenter}
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    border: .05em solid ${variables.$lightGray};
`
const Text = styled.p`
    color: ${variables.$gray};
    font-weight: bold;
    font-size: 1.2em;
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
            <Container>
                <TogglePanel 
                    handleFunction={()=> this.handleArrowButton()} 
                    buttonBackgroundColor={variables.$grayBlue}
                    flexStyles={toggleFlexStyles}
                    arrowColor={"white"}
                    isHidden={isHidden}
                    text={name}   
                />
            </Container>
        )
    }
}

export default exercise
