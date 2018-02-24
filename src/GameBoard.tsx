import RX = require("reactxp");

interface GameBoardProps {}

const styles = {
  gridContainer: RX.Styles.createViewStyle({
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
  }),
  tileContainer: RX.Styles.createViewStyle({
    width: 64.2,
    height: 64.2,
    justifyContent: "center"
  }),
  tileTextContainer: RX.Styles.createTextStyle({
    flexGrow: 1,
    textAlign: "center",
    paddingTop: 15,
    borderRadius: 1.8,
    backgroundColor: "#eee4da",
    fontWeight: "bold",
    fontSize: 40
  })
};

class GameBoard extends RX.Component<GameBoardProps, null> {
  private _board: number[][];

  constructor(props: GameBoardProps) {
    super(props);

    this._board = [[0, 2, 0, 0], [0, 0, 0, 0], [2, 0, 0, 0], [0, 0, 0, 2]];
  }

  componentDidMount() {}

  render() {
    return (
      <RX.View style={styles.gridContainer}>
        {this._board.map(row => {
          return (
            <RX.View style={styles.gridRowContainer}>
              {row.map(tile => {
                return (
                  <RX.View style={styles.gridCellContainer}>
                    <RX.GestureView style={styles.tileContainer}>
                      <RX.Text style={styles.tileTextContainer}>
                        {tile !== 0 && tile}
                      </RX.Text>
                    </RX.GestureView>
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
