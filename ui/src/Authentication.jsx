import React from 'react';
import { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import firebaseApp from './Firebase';
import firebase from 'firebase/app';
// import firebase from 'firebase';
import Post from './Post';
import List from './List';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import LinearProgress from '@material-ui/core/LinearProgress';
import btn_google_signin_dark_normal_web from './btn_google_signin_dark_normal_web.png'



const Authentication = () => {
    const [loadingState, setLoadingState] = useState(0);

    useEffect(() => {
        console.log(firebaseApp.currentUser);

        firebaseApp.onAuthStateChanged(async (user) => {
            if (firebaseApp.currentUser)
                setLoadingState(2);
            else
                setLoadingState(1);
        });


    }, [firebaseApp.currentUser]);


    const handleButtonClick = (e) => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebaseApp.signInWithRedirect(provider);
    };


    if (loadingState === 0) {
        return (
            <Box height="100%" margin="auto" width="120px" display="flex" flexDirection="column" justifyContent="center">
                <LinearProgress />
            </Box>
        )
    }
    else if (loadingState > 0 && !firebaseApp.currentUser) {
        return (
            <Box textAlign="center" height="100%" display="flex" flexDirection="column" justifyContent="center">
                <Link style={{ 'cursor': 'pointer' }} onClick={handleButtonClick}><img src={btn_google_signin_dark_normal_web} alt="" /></Link>
            </Box>
        );
    }
    else {
        return (
            <Switch>
                <Route path='/list'>
                    <List />
                </Route>

                <Route path='/post'>
                    <Post />
                </Route>

                <Route path='/' >
                    <Redirect to='/post' />
                </Route>

            </Switch>
        )
    }

};

export default withRouter(Authentication);