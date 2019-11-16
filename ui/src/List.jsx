import React, { useEffect, useState, useRef } from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    jokePaper: {
        margin: '20px',
        padding: '10px',
    }
});

const List = (props) => {

    const classes = useStyles();

    const [jokeData, setJokeData] = useState(null);
    const previousJokeDataRef = useRef();
    useEffect(() => {
        previousJokeDataRef.current = jokeData;
    }, [jokeData]);

    const [latestTellingId, setLatestTellingId] = useState(0);
    const previousTellingIdRef = useRef();
    useEffect(() => {
        previousTellingIdRef.current = latestTellingId;
    }, [latestTellingId]);

    useEffect(() => {
        const interval = setInterval(() => {
            // TODO: Update URL with your project
            fetch(`https://<project>.appspot.com/tellingsSince/${previousTellingIdRef.current}`)
                .then(results => results.json())
                .then(data => {
                    if (previousJokeDataRef.current) {
                        setJokeData(data.concat(previousJokeDataRef.current));
                    }
                    else {
                        setJokeData(data);
                    }
                });
        }, 700);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" component="h5">Dad Jokes</Typography>
            </Toolbar>
        </AppBar>

        <Container maxWidth="md">
            {
                (jokeData) ?
                    jokeData.map(joke => {
                        if (joke.tellingId > latestTellingId) {
                            setLatestTellingId(joke.tellingId);
                        }
                        let lines = joke.jokeText.split("\n");

                        return (
                            <Paper key={joke.tellingId} className={classes.jokePaper}>
                                At {joke.jokeTime}, <b>{joke.teller}</b> said:
                                {
                                    lines.map(line => {
                                        return (
                                            <Box style={{ marginTop: '10px'}}>
                                                {line}
                                            </Box>
                                        )
                                    })
                                }
                            </Paper>
                        )

                    })
                    :
                    <div>nothing yet</div>
            }
        </Container>


        </>
    );


};


export default List;
