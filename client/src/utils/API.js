import axios from "axios";

export default {
    getPiecesAll: function() {
        return axios.get("/api/pieces");
    },
    updatePiece: function(id, update) {
        return axios.put("/api/pieces/" + id, update);
    },
    makeMove: function(move) {
        return axios.post("/api/moves", move);
    }
};
