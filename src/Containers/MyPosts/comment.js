import React from "react";
import styled from "styled-components";
import DataUserWrapper from './dataWrapper';
import { FlexComponent }  from '../../Components/styleHelpers';

const StyledContainer = styled(FlexComponent)`
    flex-direction: column;
    padding: 0;
    background-color: white;
    margin: .25em 0;
`
const ContentWrapper = styled.div`
    width: 100%;
    text-align: left;
    padding: .5em;
    -ms-word-break: break-all; 
    word-break: break-all;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
`

const Comment = ({data:{nick, url, content, date}}) => {
    return (
        <StyledContainer>
            <DataUserWrapper 
                url={url}
                nick={nick}
                date={date}
                imgWidth={"2.8em"}
                imgHeight={"2.8em"} 
                nickFontSize={".8em"}  
                dateFontSize={".7em"} 
                imgMargin={"0 .5em 0 0"}
            />
            <ContentWrapper>
                { content }
            </ContentWrapper>
        </StyledContainer>
    )
}

export default Comment;