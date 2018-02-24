import RX = require("reactxp");
import GameBoard = require("./GameBoard");

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
  })
};

class App extends RX.Component<{}, null> {
  private _translationValue: RX.Animated.Value;
  private _animatedStyle: RX.Types.AnimatedTextStyleRuleSet;

  constructor() {
    super(null);

    this._translationValue = RX.Animated.createValue(-100);
    this._animatedStyle = RX.Styles.createAnimatedTextStyle({
      transform: [
        {
          translateY: this._translationValue
        }
      ]
    });
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
          <GameBoard />
        </RX.View>
      </RX.ScrollView>
    );
  }
}

export = App;
