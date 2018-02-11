import RX = require("reactxp");

interface MainPanelProps {}

const styles = {
  scroll: RX.Styles.createScrollViewStyle({
    alignSelf: "stretch",
    backgroundColor: "#f5fcff"
  }),
  container: RX.Styles.createViewStyle({
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80
  }),
  gameTitle: RX.Styles.createTextStyle({
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16
  }),
  gameContainer: RX.Styles.createViewStyle({
    marginTop: 40,
    padding: 9,
    borderRadius: 3,
    width: 300,
    height: 310,
    backgroundColor: "#bbada0"
  }),
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

class MainPanel extends RX.Component<MainPanelProps, null> {
  private _translationValue: RX.Animated.Value;
  private _animatedStyle: RX.Types.AnimatedTextStyleRuleSet;
  private _board: number[][];

  constructor(props: MainPanelProps) {
    super(props);

    this._translationValue = RX.Animated.createValue(-100);
    this._animatedStyle = RX.Styles.createAnimatedTextStyle({
      transform: [
        {
          translateY: this._translationValue
        }
      ]
    });
    this._board = [[0, 2, 0, 0], [0, 0, 0, 0], [2, 0, 0, 0], [0, 0, 0, 2]];
  }

  componentDidMount() {
    let animation = RX.Animated.timing(this._translationValue, {
      toValue: 0,
      easing: RX.Animated.Easing.OutBack(),
      duration: 500
    });

    animation.start();
  }

  render() {
    return (
      <RX.ScrollView style={styles.scroll}>
        <RX.View style={styles.container}>
          <RX.Animated.Text style={[styles.gameTitle, this._animatedStyle]}>
            Welcome to RX 2048
          </RX.Animated.Text>

          <RX.View style={styles.gameContainer}>
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
          </RX.View>
        </RX.View>
      </RX.ScrollView>
    );
  }
}

export = MainPanel;
