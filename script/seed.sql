-- Insert Dad's pieces
INSERT INTO ElephantChess_DB.Pieces
(name, type, side, Pieces.row, Pieces.column)
VALUES ('LeftRook', 'Rook', 1, 0, 0),
('LeftKnight', 'Knight', 1, 0, 1),
('LeftElephant', 'Bishop', 1, 0, 2),
('LeftAdvisor', 'Advisor', 1, 0, 3),
('King', 'King', 1, 0, 4),
('RightAdvisor', 'Advisor', 1, 0, 5),
('RightElephant', 'Bishop', 1, 0, 6),
('RightKnight', 'Knight', 1, 0, 7),
('RightRook', 'Rook', 1, 0, 8),
('LeftCannon', 'Cannon', 1, 2, 1),
('RightCannon', 'Cannon', 1, 2, 7),
('LeftBorderPawn', 'Pawn', 1, 3, 0),
('LeftMiddlePawn', 'Pawn', 1, 3, 2),
('CenterPawn', 'Pawn', 1, 3, 4),
('RightMiddlePawn', 'Pawn', 1, 3, 6),
('RightBorderPawn', 'Pawn', 1, 3, 8);

-- Insert my pieces
INSERT INTO ElephantChess_DB.Pieces
(name, type, side, Pieces.row, Pieces.column)
VALUES ('LeftBorderPawn', 'Pawn', 2, 6, 0),
('LeftMiddlePawn', 'Pawn', 2, 6, 2),
('CenterPawn', 'Pawn', 2, 6, 4),
('RightMiddlePawn', 'Pawn', 2, 6, 6),
('RightBorderPawn', 'Pawn', 2, 6, 8),
('LeftCannon', 'Cannon', 2, 7, 1),
('RightCannon', 'Cannon', 2, 7, 7),
('LeftRook', 'Rook', 2, 9, 0),
('LeftKnight', 'Knight', 2, 9, 1),
('LeftElephant', 'Bishop', 2, 9, 2),
('LeftAdvisor', 'Advisor', 2, 9, 3),
('King', 'King', 2, 9, 4),
('RightAdvisor', 'Advisor', 2, 9, 5),
('RightElephant', 'Bishop', 2, 9, 6),
('RightKnight', 'Knight', 2, 9, 7),
('RightRook', 'Rook', 2, 9, 8);

-- Definition of Side Column:
-- ENUM('Dad', 'Me') Where Dad is 1, I am 2
