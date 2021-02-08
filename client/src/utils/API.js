import axios from "axios";

export default {
    getPiecesAll: function() {
        return axios.get("/api/pieces");
    },
    updatePiece: function(id, update) {
        return axios.put("/api/pieces/" + id, update);
    },
    getMovesAll: function() {
        return axios.get("/api/moves");
    },
    getMovesAllByGame: function(id) {
        return axios.get("/api/moves/" + id);
    },
    makeMove: function(move) {
        return axios.post("/api/moves", move);
    },
    getGamesAll: function() {
        return axios.get("/api/games");
    },
    makeGame: function(game) {
        return axios.post("/api/games", game);
    },
    updateGame: function(id, update) {
        return axios.put("/api/games/" + id, update);
    }
};
