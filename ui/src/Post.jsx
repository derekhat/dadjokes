import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// import firebase from 'firebase/app';
import firebaseApp from './Firebase';
import { Typography } from '@material-ui/core';


const Post = (props) => {

    const [newJoke, setNewJoke] = useState(null);
    const [pendingNewJoke, setPendingNewJoke] = useState(false);

    useEffect(() => {
        if (pendingNewJoke) {
            const requestData = {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'tellerName': firebaseApp.currentUser.displayName }),
                method: 'POST'
            };
            // TODO: Update URL with your project
            fetch('https://<project>.appspot.com/tellings', requestData)
                .then(results => results.json())
                .then(data => {
                    setNewJoke(data.jokeText);
                    setPendingNewJoke(false);
                });
        }
    }, [pendingNewJoke]);

    const clickButton = (e) => {
        setPendingNewJoke(true);
    }

    return (
        <Box textAlign="center" height="100%" display="flex" flexDirection="column" justifyContent="center">
            <Box width="600px" ml={"auto"} mr={"auto"}>
                <Button style={{ 'width': '120px' }} variant="contained" color="secondary" onClick={clickButton} >Tell a joke</Button>
                <Box mt={4}>
                {newJoke ?
                    <Typography variant="h4" component="h4">{newJoke}</Typography>
                    :
                    <></>
                }
            </Box>
            </Box>
        </Box>
    );

}

export default Post;