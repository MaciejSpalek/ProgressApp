import React, { useState } from 'react';
import styled from 'styled-components';
import Input from './input';
import helpers from './helpers';
import UserProfile from '../Containers/Messanger/userProfile';
import { variables, FlexComponent } from './styleHelpers';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledContainer = styled(FlexComponent)`
    position: relative;
    height: 55px;
    background-color: ${variables.$lightGray};
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    padding: 0;
    margin-bottom: 1em;
    @media only screen and (min-width: 500px) {
        padding: .5em;
    }
`

const StyledInputWrapper = styled(FlexComponent)`
    max-width: 500px;
    height: 100%;
    background-color: white;
    border-bottom: .1em solid ${props => props.array ? variables.$lightGray : "none"};
    @media only screen and (min-width: 500px) {
        border-radius: .3em;
        padding: .2em .5em;
        border-bottom-left-radius: ${props => props.array ? "0" : ".3em"};
        border-bottom-right-radius: ${props => props.array ? "0" : ".3em"}; 
    }
`

const StyledProfilesWrapper = styled(FlexComponent)`
    flex-direction: column;
    position: absolute;
    top: 100%;
    max-width: 500px;
    background-color: white;
    border-bottom-left-radius: .3em;
    border-bottom-right-radius: .3em;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.3);
    z-index: 999;
    @media only screen and (min-width: 500px) {
        top: calc(100% - .5em);
    }
`

const SearchBox = ({ usersData }) => {
    const [ mutableUsersArray, setMutableUsersArray ] = useState([]);

    const filterUsers = (e) => {
        e.preventDefault();
        const inputValue = e.target.value;
        const tempUsersArray = [];

        usersData.forEach(user => {
            if(helpers.isInputTextMatch(inputValue, user.nick)) {
                tempUsersArray.push(user);
            }
        })

        inputValue !== "" ? 
        setMutableUsersArray(tempUsersArray) : 
        setMutableUsersArray([])
    }

    const renderProfiles = () => {
        return mutableUsersArray.map((user, index) => {
            return (
                <UserProfile
                    user={user}
                    key = {index}
                />
            )
        })
    }

    return (
        <StyledContainer>
            <StyledInputWrapper array={mutableUsersArray.length}>
                <Input 
                    name={"search"}  
                    type={"text"}
                    placeholder={"Szukaj"}
                    handleFunction={(e)=> {filterUsers(e)}}
                />
                <FontAwesomeIcon 
                    icon={faSearch} 
                    color={variables.$gray} 
                    style={{
                        fontSize: "1.5em",
                        marginLeft: ".5em"
                    }}
                />
            </StyledInputWrapper>
            {mutableUsersArray.length ? 
                <StyledProfilesWrapper>
                    {renderProfiles()}
                </StyledProfilesWrapper>
            : null}
            
        </StyledContainer>
    )
}

export default SearchBox;