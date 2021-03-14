import React, { useState, useEffect } from "react";
import { Container, Paper } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import API from "../utils/API";

const useStyles = makeStyles({
    root: {
      width: '100%'
    },
    container: {
      maxHeight: 500
    }
});

function GameHistory() {
    const [gamesAll, setGamesAll] = useState([]);
    const [gamesAllTablePage, setGamesAllTablePage] = useState(0);
    const [rowCountPerTablePage, setRowCountPerTablePage] = useState(10);
    const classes = useStyles();

    useEffect(() => {
        loadGamesAll();
    }, []);

    function loadGamesAll() {
        API.getGamesAll().then(res => {
            setGamesAll(res.data);
            console.log("All games set");
        }).catch(err => console.log(err));
    }

    const handleChangePage = (event, newPage) => {
        setGamesAllTablePage(newPage);
    };
    
    const handleChangeRowCountPerTablePage = (event) => {
        setRowCountPerTablePage(+event.target.value);
        setGamesAllTablePage(0);
    };

    return (
        <Container className={classes.root}>
            <TableContainer component={Paper} className={classes.container}>
                <Table stickyHeader>
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
                        gamesAll.slice(gamesAllTablePage * rowCountPerTablePage,
                            gamesAllTablePage * rowCountPerTablePage + rowCountPerTablePage).map(game => (
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
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={gamesAll.length}
                rowsPerPage={rowCountPerTablePage}
                page={gamesAllTablePage}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowCountPerTablePage}
            />
        </Container>
    );
}

export default GameHistory;
