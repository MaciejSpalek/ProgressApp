import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { flexCenter, variables, FlexComponent }  from '../../Components/styleHelpers';
import Cross from '../../Components/cross';
import Input from '../../Components/input';

const StyledContainer = styled(FlexComponent)`
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    height: 100%;
    padding: 0;
`
const MessageWindowHeader = styled.div`
    ${flexCenter};
    justify-content: space-between;
    width: 100%;
    padding: .5em;
    border-bottom: .05em solid ${variables.$lightGray};   
`
const StyledWrapper = styled(FlexComponent)`
    width: auto;
    padding: 0;
    cursor: pointer;
`
const Nick = styled.p`
    color: ${variables.$grayBlue};
    font-size: 1.5em;
    font-weight: bold;
`
const Image = styled.div`
    position:relative;
    width:2.5em;
    height: 2.5em;
    background-image: url(${props => props.url});
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    margin-right: .5em;
`

const LogDot = styled.span`
    position: absolute;
    bottom: .02em;
    right:.02em;
    width: .8em;
    height: .8em;
    background-color: ${props => props.isLogged ? "green" : "red"};
    border-radius: 50%;
    border: .15em solid white;
`

const MessageWindowContent = styled.div`
    ${flexCenter}
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: .5em;
`

const FormBox = styled.form`
    ${flexCenter};
    width: 100%;
    height: 50px;
    padding: .25em .5em;
    border-top: .05em solid ${variables.$lightGray};
    background-color: ${variables.$blue};
`


const crossStyled = {
    color: `${variables.$gray}`
}






const ConversationPanel = ({ 
    isConversationUserLogged,
    converserPhotoURL,
    hideConversation,
    messageWindowRef,
    renderMessages,
    converserNick,
    sendMessage,
}) => {

    return (
        <StyledContainer>
            <MessageWindowHeader>
                <StyledWrapper>
                    <Image url={converserPhotoURL}>
                        <LogDot isLogged={isConversationUserLogged}/>
                    </Image>
                    <Nick> {converserNick} </Nick>
                </StyledWrapper>
                <Cross 
                    handleClick={()=> hideConversation()}
                    styled={crossStyled}
                    fontSize={{ fontSize: "2em" }}
                />
            </MessageWindowHeader>
            <MessageWindowContent >
                {renderMessages()}
                <div ref={messageWindowRef} />
            </MessageWindowContent>
            <FormBox onSubmit = {(e) => sendMessage(e)}>
                <Input 
                    style={{ margin: ".25em 0" }} 
                    type={"text"} 
                    name={"input"} 
                    placeholder="Napisz..."
                    handleFunction={()=> {}}
                />
                <FontAwesomeIcon 
                    icon={faPaperPlane} 
                    color={variables.$grayBlue} 
                    style={{ fontSize: "1.5em" }}
                />
            </FormBox>
        </StyledContainer>
    )
}

export default ConversationPanel;