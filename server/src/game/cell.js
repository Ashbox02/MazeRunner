class Cell {
	//each cell has 4 walls by default, walls may be removed. 
	//each cell must also know its position
	constructor(row, col) {
		this.row = row;
		this.col = col;

		this.left = true;
		this.right = true;
		this.top = true;
		this.bottom = true;
	}
}

module.exports = Cell;