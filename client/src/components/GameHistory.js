import React, { useState, useEffect } from "react";
import { Container, Paper } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import API from "../utils/API";

function GameHistory(props) {
    const [gamesAll, setGamesAll] = useState([]);

    useEffect(() => {
        loadGamesAll();
    }, []);

    function loadGamesAll() {
        API.getGamesAll().then(res => {
            setGamesAll(res.data);
            console.log("All games set");
        }).catch(err => console.log(err));
    }

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Start Date/Time</TableCell>
                            <TableCell align="right">Winner</TableCell>
                            <TableCell align="right">Loser</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gamesAll.length ?
                        gamesAll.map(game => (
                            <TableRow key={game.id}>
                                <TableCell>{game.id}</TableCell>
                                <TableCell align="right">{game.name}</TableCell>
                                <TableCell align="right">{game.startDate}</TableCell>
                                <TableCell align="right">{game.winner}</TableCell>
                                <TableCell align="right">{game.loser}</TableCell>
                            </TableRow>
                        )) : ""}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default GameHistory;
