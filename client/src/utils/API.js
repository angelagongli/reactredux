import axios from "axios";

export default {
    getPiecesAll: function() {
        return axios.get("/api/pieces");
    },
    updatePiece: function(id) {
        return axios.put("/api/pieces/" + id);
    }
};
