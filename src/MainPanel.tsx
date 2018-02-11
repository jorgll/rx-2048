import RX = require("reactxp");

interface MainPanelProps {}

const styles = {
  scroll: RX.Styles.createScrollViewStyle({
    alignSelf: "stretch",
    backgroundColor: "#f5fcff"
  }),
  container: RX.Styles.createViewStyle({
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  }),
  gameTitle: RX.Styles.createTextStyle({
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 28
  }),
  gameContainer: RX.Styles.createViewStyle({
    marginTop: 40,
    padding: 15,
    borderRadius: 6,
    width: 500,
    height: 515,
    backgroundColor: "#bbada0"
  }),
  gridContainer: RX.Styles.createViewStyle({
    flexWrap: "wrap"
  }),
  gridRowContainer: RX.Styles.createViewStyle({
    flexDirection: "row",
    marginBottom: 15
  }),
  gridCellContainer: RX.Styles.createViewStyle({
    width: 106.25,
    height: 106.25,
    marginRight: 15,
    borderRadius: 3,
    backgroundColor: "rgba(238, 228, 218, 0.35)"
  }),
  tileContainer: RX.Styles.createViewStyle({
    width: 107,
    height: 107,
    justifyContent: "center"
  }),
  tileTextContainer: RX.Styles.createTextStyle({
    flexGrow: 1,
    textAlign: "center",
    paddingTop: 25,
    borderRadius: 3,
    backgroundColor: "#eee4da",
    fontWeight: "bold",
    fontSize: 55
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
