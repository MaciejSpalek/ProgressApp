import React, { Component } from 'react'
import styled from 'styled-components'
import { variables, flexCenter, SpaceBetweenWrapper, FlexWrapper } from '../../Components/styleHelpers'
import ArrowButton from '../../Components/arrowButton'

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
                <SpaceBetweenWrapper style={{backgroundColor: variables.$lightRed}}>
                    <Text> { name } </Text>
                    <ArrowButton
                        backgroundColor={variables.$grayBlue}
                        fontColor={"white"}
                        isHide={isHidden}
                        handleArrowButton={()=> this.handleArrowButton()}
                    />
                </SpaceBetweenWrapper>
                {/* {!isHidden ? planContent : null} */}
            </Container>
        )
    }
}

export default exercise
