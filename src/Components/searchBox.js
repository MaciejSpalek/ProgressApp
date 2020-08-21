import React, { useState } from 'react';
import styled from 'styled-components';
import InputLabel from './InputLabel';
import helpers from './helpers';
import UserProfile from '../Containers/Messanger/userItem';
import { variables, FlexComponent, flexCenter } from './styleHelpers';
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
        max-width: calc(500px - 1em);
        padding: .2em .5em;
        border-bottom-left-radius: ${props => props.array ? "0" : ".3em"};
        border-bottom-right-radius: ${props => props.array ? "0" : ".3em"}; 
    }
`

const StyledProfilesWrapper = styled.ul`
    ${flexCenter};
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 100%;
    background-color: white;
    border-bottom-left-radius: .3em;
    border-bottom-right-radius: .3em;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.3);
    z-index: 999;
    @media only screen and (min-width: 500px) {
        top: calc(100% - .5em);
        max-width: calc(500px - 1em);
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
                <InputLabel 
                    name={"search"}  
                    type={"search"}
                    placeholder={"Szukaj znajomych"}
                    ariaLabel={"Szukaj znajomych"}
                    handleFunction={(e)=> {filterUsers(e)}}
                />
                <FontAwesomeIcon 
                    icon={faSearch} 
                    style={{
                        color: variables.$gray,
                        marginLeft: ".5em",
                        fontSize: "1.5em",
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