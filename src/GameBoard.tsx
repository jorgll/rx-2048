import RX = require("reactxp");
import Tile = require("./Tile");

interface GameBoardProps {}
interface GameState {
  board: number[][];
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
  constructor(props: GameBoardProps) {
    super(props);
    this.state = {
      board: [
        [0, 2, 4, 8],
        [16, 32, 64, 128],
        [256, 512, 1024, 2048],
        [0, 0, 0, 0]
      ]
    };
  }

  componentDidMount() {}

  render() {
    return (
      <RX.View style={styles.gameContainer}>
        {this.state.board.map(row => {
          return (
            <RX.View style={styles.gridRowContainer}>
              {row.map(tile => {
                return (
                  <RX.View style={styles.gridCellContainer}>
                    <Tile value={tile} row={1} column={2} merged={false} />
                  </RX.View>
                );
              })}
            </RX.View>
          );
        })}
      </RX.View>
    );
  }
}

export = GameBoard;
