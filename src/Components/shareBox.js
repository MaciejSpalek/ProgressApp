import React from "react"
import styled from 'styled-components';
import * as styleHelpers  from './styleHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'

const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;

const Container = styled.div`
    ${flexCenter}
    flex-direction: column;
    width: 280px;
    border-radius: .5em;
    /* background-color: ${variables.$grayBlue}; */
    padding: .5em ;
`
const TextArea = styled.textarea`
    ${flexCenter}
    width: 100%;
    height:150px;
    border-radius: .3em;
    border: none;
    background-color: white;
    color: black;
    padding: .5em;
    font-size: 1.2em;
    font-weight:bold;
    resize:none;
    margin-bottom: .5em;
    &::placeholder {
        color: ${variables.$blue};
    }
`
const AddArea = styled.div`
    ${flexCenter};
    justify-content: space-between;
    width: 100%;
` 

const ShareBox = () => {
    return (
        <Container>
            <TextArea placeholder="Napisz coś..."></TextArea>
            <AddArea>
                <label>
                    <FontAwesomeIcon icon={faFileUpload} style={{fontSize: 35, margin: '.1em'}} color={variables.$orange} />
                    <input type="file" style={{display: "none"}}/>
                </label>
                <styleHelpers.Button>Opublikuj</styleHelpers.Button>
            </AddArea>
        </Container>
    )
}
                
export default ShareBox;

                