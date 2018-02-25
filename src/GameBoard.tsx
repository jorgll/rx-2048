import RX = require("reactxp");
import Tile = require("./Tile");
import * as _ from "lodash";

enum Direction {
  up, // 0
  down, // 1
  left, // 2
  right // 3
}

interface GameBoardProps {}
interface GameState {
  board: Tile[][];
}

const styles = {
  gameContainer: RX.Styles.createViewStyle({
    marginTop: 40,
    padding: 9,
    borderRadius: 3,
    width: 300,
    height: 310,
    backgroundColor: "#bbada0",
    flexWrap: "wrap"
  }),
  gridRowContainer: RX.Styles.createViewStyle({
    flexDirection: "row",
    marginBottom: 9
  }),
  gridCellContainer: RX.Styles.createViewStyle({
    width: 63.75,
    height: 63.75,
    marginRight: 9,
    borderRadius: 1.8,
    backgroundColor: "rgba(238, 228, 218, 0.35)"
  })
};

class GameBoard extends RX.Component<GameBoardProps, GameState> {
  boardSize = 4; // NxN
  tileCount = 0;
  testMode = true;
  maxInitialTileCount = 4;
  Direction = Direction;
  uniqueTileId = 0;

  constructor(props: GameBoardProps) {
    super(props);
    this.state = {
      board: []
    };
  }

  componentDidMount() {
    this.startNewGame();
  }

  render() {
    return (
      <RX.View style={styles.gameContainer}>
        {this.state.board.map(row => {
          return (
            <RX.View style={styles.gridRowContainer} key={row[0].props.id}>
              {row.map(tile => {
                return (
                  <RX.View style={styles.gridCellContainer} key={tile.props.id}>
                    {
                      <Tile
                        row={tile.props.row}
                        column={tile.props.column}
                        merged={tile.props.merged}
                        value={tile.props.value}
                        id={tile.props.id}
                        key={tile.props.id}
                      />
                    }
                  </RX.View>
                );
              })}
            </RX.View>
          );
        })}
      </RX.View>
    );
  }

  startNewGame(): void {
    let newBoard: Tile[][] = this.initializeEmptyBoard([]);
    if (this.testMode) {
      newBoard = this.addTestTiles(newBoard);
    } else {
      this.seedInitialValues(newBoard);
    }
    this.setState({ board: newBoard });

    console.log(
      "*******************************************************************"
    );
    console.log("Initial board state set up");
  }

  initializeEmptyBoard(board: Tile[][]): Tile[][] {
    for (let i = 0; i < this.boardSize; i++) {
      board[i] = [];
      for (let j = 0; j < this.boardSize; j++) {
        board[i][j] = new Tile({
          row: i,
          column: j,
          value: 0,
          merged: false,
          id: this.uniqueTileId++
        });
      }
    }
    return board;
  }

  seedInitialValues(board: Tile[][]): Tile[][] {
    for (let i = 0; i < this.maxInitialTileCount; i++) {
      this.addTile(board);
    }
    return board;
  }

  // Method guarantees it will add a single tile.
  // It will keep trying until it does.
  addTile(board: Tile[][]): Tile[][] {
    if (this.hasLost()) {
      console.log("You lose");
      return board;
    }

    const value = 2;
    const emptySpot = this.findEmptySpot();
    this.placeTile(
      new Tile({
        row: emptySpot.props.row,
        column: emptySpot.props.column,
        value: value,
        merged: false,
        id: this.uniqueTileId++
      }),
      board
    );

    return board;
  }

  hasLost(): boolean {
    // Check for lose condition
    if (this.tileCount >= this.boardSize * this.boardSize) {
      return true;
    }
    return false;
  }

  findEmptySpot(): Tile {
    let emptyRow: number = 0,
      emptyColumn: number = 0;

    do {
      emptyRow = _.random(this.boardSize - 1);
      emptyColumn = _.random(this.boardSize - 1);
    } while (this.state.board[emptyRow][emptyColumn].props.value !== 0);

    return new Tile({
      row: emptyRow,
      column: emptyColumn,
      value: 0,
      merged: false,
      id: this.uniqueTileId++
    });
  }

  placeTile(t: Tile, board: Tile[][]): Tile[][] {
    console.log("    Adding tile ", t);
    board[t.props.row][t.props.column] = new Tile({
      row: t.props.row,
      column: t.props.column,
      value: t.props.value,
      merged: false,
      id: this.uniqueTileId++
    });
    this.tileCount++;
    return board;
  }

  moveTile(from: Tile, to: Tile, board: Tile[][]): Tile[][] {
    console.log("    Moving tile ", from, to);
    board[to.props.row][to.props.column] = new Tile({
      row: from.props.row,
      column: from.props.column,
      value: from.props.value,
      merged: false,
      id: this.uniqueTileId++
    });
    board[from.props.row][from.props.column] = new Tile({
      row: from.props.row,
      column: from.props.column,
      value: 0,
      merged: false,
      id: this.uniqueTileId++
    });
    return board;
  }

  combineTiles(from: Tile, to: Tile, board: Tile[][]): Tile[][] {
    console.log("    Combining to make new tile ", from, to);
    board[to.props.row][to.props.column] = new Tile({
      row: from.props.row,
      column: from.props.column,
      value: from.props.value + from.props.value,
      merged: true,
      id: this.uniqueTileId++
    });
    board[from.props.row][from.props.column] = new Tile({
      row: from.props.row,
      column: from.props.column,
      value: 0,
      merged: false,
      id: this.uniqueTileId++
    });
    this.tileCount--;
    return board;
  }

  moveOneStep(current: Tile, direction: Direction, board: Tile[][]): Tile {
    let result: Tile = null;
    switch (direction) {
      case Direction.up:
        if (this.isValidTile(current, -1, 0)) {
          result = board[current.props.row - 1][current.props.column];
        }
        break;
      case Direction.down:
        if (this.isValidTile(current, +1, 0)) {
          result = board[current.props.row + 1][current.props.column];
        }
        break;
      case Direction.left:
        if (this.isValidTile(current, 0, -1)) {
          result = board[current.props.row][current.props.column - 1];
        }
        break;
      case Direction.right:
        if (this.isValidTile(current, 0, +1)) {
          result = board[current.props.row][current.props.column + 1];
        }
        break;
      default:
        break;
    }
    if (result) {
      console.log("    moveOneStep, direction: " + direction);
    }
    return result;
  }

  isValidTile(tile: Tile, rowDelta?: number, columnDelta?: number): boolean {
    if (!tile) {
      return false;
    }

    const max: number = this.boardSize - 1;
    const min = 0;
    const newRow = rowDelta ? tile.props.row + rowDelta : tile.props.row;
    const newColumn = columnDelta
      ? tile.props.column + columnDelta
      : tile.props.column;
    const isValid: boolean =
      newRow >= min && newRow <= max && newColumn >= min && newColumn <= max;
    return isValid;
  }

  isTileAvailable(tile: Tile): boolean {
    return tile.props.value === 0;
  }

  resetTileMergeState(board: Tile[][]): Tile[][] {
    board.forEach(row => {
      row.forEach(
        tile =>
          (board[tile.props.row][tile.props.column] = new Tile({
            row: tile.props.row,
            column: tile.props.column,
            value: tile.props.value,
            merged: false,
            id: this.uniqueTileId++
          }))
      );
    });
    return board;
  }

  // Takes a single tile on the board and a direction, finds the next spot to move the tile to
  //
  // tile contains:
  // 1. The next non-empty tile in the direction specified
  // 2. The board edge if there are no more tiles in that direction
  // 3. null if the current tile is already at the board edge
  //
  // lastEmptyPosition returns the last valid empty position before the next
  //
  getNextPosition(
    tile: Tile,
    direction: Direction,
    board: Tile[][]
  ): { lastEmptyPosition: Tile; tile: Tile } {
    let current: Tile = tile;
    let previous: Tile = tile;
    do {
      previous = current;
      current = this.moveOneStep(current, direction, board);
    } while (this.isValidTile(current) && this.isTileAvailable(current));

    if (current === tile) {
      current = null;
    }

    if (current) {
      console.log("    getNextTile. Direction: " + direction, tile, current);
    }
    return {
      lastEmptyPosition: previous,
      tile: current
    };
  }

  // Get rows vs. columns of tiles to process in order
  getTileGroups(direction: Direction): Tile[][] {
    let tileGroups: Tile[][];
    if (direction === Direction.up || direction === Direction.down) {
      // Process columns
      tileGroups = _.unzip(this.state.board);
    } else {
      // Process rows
      tileGroups = this.state.board;
    }
    return tileGroups;
  }

  // Accepts a TileGroup (row or column with candidate tiles to process)
  // Returns a filtered list of valid tiles ready to process moves on
  getValidTiles(tileGroup: Tile[], direction: Direction): Tile[] {
    const validTiles: Tile[] = tileGroup.filter(
      tile => !this.isTileAvailable(tile)
    );
    if (direction === Direction.right || direction === Direction.down) {
      console.log(
        "Direction was right/up - inverting order of tiles to process"
      );
      validTiles.reverse();
    }
    return validTiles;
  }

  // Main move method
  // Interprets a user move up/down/left/right command
  move(direction: Direction): void {
    console.log("\r\n");
    console.log("***** move " + direction + " *****");
    let foundMove = false;
    let newBoard: Tile[][] = _.cloneDeep(this.state.board);

    // Get a list of TileGroups and evaluate Tiles in each one
    this.getTileGroups(direction).forEach(tileGroup => {
      this.getValidTiles(tileGroup, direction).forEach(current => {
        console.log("Processing: ", current);
        const next = this.getNextPosition(current, direction, newBoard);
        if (
          next.tile &&
          next.tile !== current &&
          current.props.value === next.tile.props.value &&
          !next.tile.props.merged
        ) {
          this.combineTiles(current, next.tile, newBoard);
          foundMove = true;
        } else if (
          next &&
          next.tile !== current &&
          this.isTileAvailable(next.lastEmptyPosition)
        ) {
          console.log("    Moving to last empty spot");
          this.moveTile(current, next.lastEmptyPosition, newBoard);
          foundMove = true;
        } else {
          console.log("    Nothing to do for tile", current);
        }
      });
    });

    if (foundMove && !this.testMode) {
      console.log("foundMove = true. New state:");
      this.addTile(this.state.board);
    }
    newBoard = this.resetTileMergeState(newBoard);
    this.setState({ board: newBoard });
  }

  // Used to force a test case for debug purposes
  // Set testMode = true to get the board to read this config
  addTestTiles(board: Tile[][]): Tile[][] {
    board[0][1] = new Tile({
      row: 0,
      column: 1,
      value: 2,
      merged: false,
      id: this.uniqueTileId++
    });

    board[0][2] = new Tile({
      row: 0,
      column: 2,
      value: 2,
      merged: false,
      id: this.uniqueTileId++
    });

    board[0][3] = new Tile({
      row: 0,
      column: 3,
      value: 2,
      merged: false,
      id: this.uniqueTileId++
    });

    board[1][3] = new Tile({
      row: 1,
      column: 3,
      value: 8,
      merged: false,
      id: this.uniqueTileId++
    });

    return board;
  }
}

export = GameBoard;
