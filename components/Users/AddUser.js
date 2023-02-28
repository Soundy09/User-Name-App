import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import Button from '../UI/Button';
import ErrorModal from "../UI/ErrorModal";

import Wrapper from "../Helpers/Wrapper";

import classes from './AddUser.module.css'


const AddUser = props => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;
        if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0){
        setError({
            title:'Invalid input',
            messsage: 'Please enter a valid  and age(> 0)'
        });
            return;
    }
        if (+enteredUserAge < 1) {
            setError({
                title:'Invalid age,',
                Message:'Please enter a vaid name and age'
            });
            return;
        }
        props.onAddUser(enteredUserAge, enteredName);
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    };



const errorHandler = () => {
    setError(null);
};

    return (
    <Wrapper>
    {error && 
    (<ErrorModal 
    title={error.title} 
    messsage={error.message} 
    onConfirm={errorHandler}
    />
    )}

    <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
            <label htmlFor="usernamer">Username</label>
            <input 
            type="text" 
            id="username" 
            ref={nameInputRef}
            /> 
            
            <label htmlFor="age"> Age (years)</label>
            <input 
            id="age" 
            type="number" 
            ref={ageInputRef}
            />
            <Button type="submit">
                Add User
            </Button>
        </form>
        
    </Card>
</Wrapper>
    );

};

export default AddUser;