import RX = require("reactxp");

interface TileProps {
  row: number;
  column: number;
  value: number;
  merged: boolean;
}

const styles = {
  tileContainer: RX.Styles.createViewStyle({
    width: 64.2,
    height: 64.2,
    justifyContent: "center",
    flexGrow: 1,
    borderRadius: 1.8
  }),
  tile2: RX.Styles.createTextStyle({
    flexGrow: 1,
    paddingTop: 7,
    backgroundColor: "#eee4da",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40
  }),
  tile4: RX.Styles.createTextStyle({
    flexGrow: 1,
    paddingTop: 7,
    backgroundColor: "#eee1c9",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40
  }),
  tile8: RX.Styles.createTextStyle({
    flexGrow: 1,
    paddingTop: 7,
    color: "#f9f6f2",
    backgroundColor: "#f3b27a",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40
  }),
  tile16: RX.Styles.createTextStyle({
    flexGrow: 1,
    paddingTop: 7,
    color: "#f9f6f2",
    backgroundColor: "#f69664",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40
  }),
  tile32: RX.Styles.createTextStyle({
    flexGrow: 1,
    paddingTop: 7,
    color: "#f9f6f2",
    backgroundColor: "#f77c5f",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40
  }),
  tile64: RX.Styles.createTextStyle({
    flexGrow: 1,
    paddingTop: 7,
    color: "#f9f6f2",
    backgroundColor: "#f75f3b",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40
  }),
  tile128: RX.Styles.createTextStyle({
    flexGrow: 1,
    paddingTop: 14,
    color: "#f9f6f2",
    backgroundColor: "#edd073",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30
  }),
  tile256: RX.Styles.createTextStyle({
    flexGrow: 1,
    paddingTop: 14,
    color: "#f9f6f2",
    backgroundColor: "#edcc62",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30
  }),
  tile512: RX.Styles.createTextStyle({
    flexGrow: 1,
    paddingTop: 14,
    color: "#f9f6f2",
    backgroundColor: "#edc950",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30
  }),
  tile1024: RX.Styles.createTextStyle({
    flexGrow: 1,
    paddingTop: 18,
    color: "#f9f6f2",
    backgroundColor: "#edc53f",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25
  }),
  tile2048: RX.Styles.createTextStyle({
    flexGrow: 1,
    paddingTop: 18,
    color: "#f9f6f2",
    backgroundColor: "#edc22e",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25
  })
};

class Tile extends RX.Component<TileProps, null> {
  constructor(props: TileProps) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <RX.GestureView style={styles.tileContainer}>
        <RX.Text style={this.getTileStyle()}>
          {this.props.value !== 0 && this.props.value}
        </RX.Text>
      </RX.GestureView>
    );
  }

  getTileStyle(): RX.Types.StyleRuleSet<RX.Types.TextStyle> {
    let style: RX.Types.StyleRuleSet<RX.Types.TextStyle> = null;
    switch (this.props.value) {
      case 2:
        style = styles.tile2;
        break;
      case 4:
        style = styles.tile4;
        break;
      case 8:
        style = styles.tile8;
        break;
      case 16:
        style = styles.tile16;
        break;
      case 32:
        style = styles.tile32;
        break;
      case 64:
        style = styles.tile64;
        break;
      case 128:
        style = styles.tile128;
        break;
      case 256:
        style = styles.tile256;
        break;
      case 512:
        style = styles.tile512;
        break;
      case 1024:
        style = styles.tile1024;
        break;
      case 2048:
        style = styles.tile2048;
        break;
      default:
        style = styles.tile2;
        break;
    }
    return style;
  }
}

export = Tile;
