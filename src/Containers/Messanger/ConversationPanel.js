import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { flexCenter, variables, FlexComponent }  from '../../Components/styleHelpers';
import Cross from '../../Components/cross';
import InputLabel from '../../Components/InputLabel';
import ImageWrapper from '../../Components/ImageWrapper';
import SquareButton from '../../Components/Buttons/SquareButton';


const StyledContainer = styled(FlexComponent)`
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    height: 100%;
    padding: 0;
`

const StyledMessageWindowHeader = styled(FlexComponent)`
    border-bottom: .05em solid ${variables.$lightGray};   
    justify-content: space-between;
`

const StyledMessageList = styled.ul`
    ${flexCenter}
    justify-content: flex-start;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: .5em;
    overflow-y: scroll;
`

const StyledForm = styled.form`
    ${flexCenter};
    width: 100%;
    height: 50px;
    padding: .25em .5em;
    border-top: .05em solid ${variables.$lightGray};
    background-color: ${variables.$blue};
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
    margin-left: .5em;
`





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
            <StyledMessageWindowHeader>
                <StyledWrapper>
                    <ImageWrapper 
                        isLogged={isConversationUserLogged}
                        url={converserPhotoURL}
                        alt={converserNick}
                        imgHeight={"3.5em"}
                        imgWidth={"3.5em"}
                        dotSize={".9em"}
                        gap={".15em"}
                        />
                    <Nick> {converserNick} </Nick>
                </StyledWrapper>
                <Cross 
                    handleClick={()=> hideConversation()}
                    fontSize={"2em"}
                />
            </StyledMessageWindowHeader>
            <StyledMessageList >
                {renderMessages()}
                <div ref={messageWindowRef} />
            </StyledMessageList>
            <StyledForm onSubmit = {(e) => sendMessage(e)}>
                <InputLabel 
                    ariaLabel={"Napisz wiadomość"}
                    style={{ margin: ".25em 0" }} 
                    handleFunction={()=> {}}
                    placeholder="Napisz..."
                    maxLength={150}
                    name={"input"} 
                    type={"text"} 
                />
                <SquareButton 
                    iconName={faPaperPlane}
                    iconColor={variables.$grayBlue}
                    iconStyle={{ fontSize: "1.5em" }}
                    handleFunction={()=> {}} 
                />
            </StyledForm>
        </StyledContainer>
    )
}

export default ConversationPanel;