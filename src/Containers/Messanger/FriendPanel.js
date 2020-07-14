import React from 'react';
import styled from 'styled-components'
import { flexCenter, variables, FlexComponent }  from "../../Components/styleHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUsers } from "@fortawesome/free-solid-svg-icons";
import Input from '../../Components/input';


const StyledContainer = styled(FlexComponent)`
    justify-content: flex-end;
    flex-direction: column;
    background-color: white;
    height: calc(100vh - 64px);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    padding: 0;


    @media only screen and (min-width: 768px) {
        max-width: 320px;
    }
`

const StyledTopWrapper = styled(FlexComponent)`
    flex-direction: column;
    justify-content: flex-end;
    height: calc(100vh - 64px - 50px);
    padding: 0;
`
const StyledBottomWrapper = styled(FlexComponent)`
    justify-content: space-between;
    height: 50px;
    padding: .5em;
`

const StyledUsersWrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: .5em;
    overflow-y: scroll;
    `

const SearchBox = styled.div`
    ${flexCenter};
    width: 100%;
    height: 45px;
    padding: .5em;
    background-color: ${variables.$blue};
    border-top: .05em solid ${variables.$lightGray};
    border-bottom : .05em solid ${variables.$lightGray};
`

const Caption = styled.p`
    color: ${variables.$gray};
    font-size: 1.5em;
    font-weight: bold;
`


const FriendPanel = ({ 
    inputText, 
    renderFriends, 
    renderProfiles,  
    filterNicks,
    amountOfFriends
}) => {
    return (
        <StyledContainer>
            <StyledTopWrapper>
                <StyledUsersWrapper>
                    {inputText === "" ? renderFriends() : renderProfiles()}
                </StyledUsersWrapper>
                <SearchBox>
                    <Input 
                        placeholder="Szukaj znajomych..." 
                        handleFunction={(e)=> filterNicks(e)} 
                    />
                    <FontAwesomeIcon 
                        icon={faSearch} 
                        color={variables.$gray} 
                        style={{fontSize: "1.5em"}}
                    />
                </SearchBox> 
            </StyledTopWrapper>
            <StyledBottomWrapper>
                <Caption> Znajomi ({amountOfFriends}) </Caption>
                <FontAwesomeIcon 
                    icon={faUsers} 
                    color={variables.$grayBlue} 
                    style={{fontSize: 30}}
                /> 
            </StyledBottomWrapper>
        </StyledContainer> 
    )
}

export default FriendPanel;

