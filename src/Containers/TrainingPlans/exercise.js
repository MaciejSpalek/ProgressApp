import React, { Component } from 'react'
import styled from 'styled-components'
import { variables, flexCenter, SpaceBetweenWrapper, FlexWrapper } from '../../Components/styleHelpers'
import ArrowButton from '../../Components/arrowButton'

const Container = styled.div`
    width: 100%;

`
class exercise extends Component {
    render() {
        const { exerciseName, exerciseType } = this.props
        return (
            <Container>
                
            </Container>
        )
    }
}

export default exercise
