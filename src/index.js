import React, { Component } from "react";
import ReactDOM from "react-dom";
import ScrollMagic from "scrollmagic";
import { TweenLite, TimelineLite, Power0 } from "gsap";
import "animation.gsap";
import "debug.addIndicators";
import ScrollingColorBackground from "./lib/ScrollingColorBackground";
import matchMedia from "./utils/matchMedia";

import "./styles.css";

const element = document.documentElement,
  page = document.getElementsByTagName("body")[0],
  pageWidth = window.innerWidth || element.clientWidth || page.clientWidth,
  pageHeight = window.innerHeight || element.clientHeight || page.clientHeight;

const PADDING_TOP = 120;

const media = matchMedia("(max-width: 640px)");

const paths1 = [
  {
    horizontal: 250,
    vertical: 1.38
  },
  {
    horizontal: 284,
    vertical: 0.519
  },
  {
    horizontal: 250,
    vertical: 0.463
  },
  {
    horizontal: 115,
    vertical: 1.824
  },
  {
    horizontal: -66,
    vertical: 1.009
  },
  {
    horizontal: -203,
    vertical: 1.824
  },
  {
    horizontal: -291,
    vertical: 0.463
  },
  {
    horizontal: -325,
    vertical: 0.519
  },
  {
    horizontal: -291,
    vertical: 0.5
  },
  {
    horizontal: 0,
    vertical: 1.5
  }
];

const paths2 = [
  {
    horizontal: 121,
    vertical: 0.843
  },
  {
    horizontal: 155,
    vertical: 0.674
  },
  {
    horizontal: 121,
    vertical: 0.674
  },
  {
    horizontal: -30,
    vertical: 2.299
  },
  {
    horizontal: -65,
    vertical: 0.674
  },
  {
    horizontal: -20,
    vertical: 0.674
  },
  {
    horizontal: 14,
    vertical: 0.674
  },
  {
    horizontal: -30,
    vertical: 0.602
  },
  {
    horizontal: -239,
    vertical: 1.505
  },
  {
    horizontal: -273,
    vertical: 0.674
  },
  {
    horizontal: -239,
    vertical: 0.626
  },
  {
    horizontal: -101,
    vertical: 2.407
  },
  {
    horizontal: 0,
    vertical: 0.674
  }
];

const paths3 = [
  {
    horizontal: 255,
    vertical: 1.25
  },
  {
    horizontal: 289,
    vertical: 0.467
  },
  {
    horizontal: 255,
    vertical: 0.467
  },
  {
    horizontal: 108,
    vertical: 1.625
  },
  {
    horizontal: -290,
    vertical: 1.933
  },
  {
    horizontal: -324,
    vertical: 0.467
  },
  {
    horizontal: -290,
    vertical: 0.467
  },
  {
    horizontal: -144,
    vertical: 1.608
  },
  {
    horizontal: 0,
    vertical: 0.717
  }
];

const generateBallPaths = paths => {
  let newArray = [];

  paths.forEach((path, index) => {
    if (index === 0) {
      newArray.push({
        horizontalOffset: {
          values: [{ x: 0 }, { x: path.horizontal }]
        },
        duration: path.vertical
      });
    } else {
      newArray.push({
        horizontalOffset: {
          values: [{ x: paths[index - 1].horizontal }, { x: path.horizontal }]
        },
        duration: path.vertical
      });
    }
  });

  return newArray;
};

const ballPaths1 = generateBallPaths(paths1);
const ballPaths2 = generateBallPaths(paths2);
const ballPaths3 = generateBallPaths(paths3);

const generateSceneConfig = target => {
  return {
    triggerElement: target,
    duration: 1080,
    triggerHook: PADDING_TOP / pageHeight
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.controller1 = new ScrollMagic.Controller();
    this.controller2 = new ScrollMagic.Controller();
    this.controller3 = new ScrollMagic.Controller();

    this.tween1 = new TimelineLite();
    this.tween2 = new TimelineLite();
    this.tween3 = new TimelineLite();

    this.ball = React.createRef();

    this.trigger1 = React.createRef();
    this.trigger2 = React.createRef();
    this.trigger3 = React.createRef();

    this.target1 = React.createRef();
    this.target2 = React.createRef();
    this.target3 = React.createRef();
  }

  state = {
    isMobile: media.matches
  };

  componentDidMount() {
    this.handleResolution(media);
    media.addListener(this.handleResolution);

    const scene1Config = generateSceneConfig(this.trigger1.current);
    const scene2Config = generateSceneConfig(this.trigger2.current);
    const scene3Config = generateSceneConfig(this.trigger3.current);

    ballPaths1.forEach(item => {
      return this.tween1.add(
        TweenLite.to(this.ball.current, item.duration, {
          css: { bezier: item.horizontalOffset },
          ease: Power0.easeNone
        })
      );
    });
    ballPaths2.forEach(item => {
      return this.tween2.add(
        TweenLite.to(this.ball.current, item.duration, {
          css: { bezier: item.horizontalOffset },
          ease: Power0.easeNone
        })
      );
    });
    ballPaths3.forEach(item => {
      return this.tween3.add(
        TweenLite.to(this.ball.current, item.duration, {
          css: { bezier: item.horizontalOffset },
          ease: Power0.easeNone
        })
      );
    });

    new ScrollMagic.Scene(scene1Config)
      .setPin(this.target1.current)
      .setTween(this.tween1)
      .addTo(this.controller1);

    new ScrollMagic.Scene(scene2Config)
      .setPin(this.target2.current)
      .setTween(this.tween2)
      .addTo(this.controller2);

    new ScrollMagic.Scene(scene3Config)
      .setPin(this.target3.current)
      .setTween(this.tween3)
      .addTo(this.controller3);
  }

  componentWillUnmount() {
    media.removeListener(this.handleResolution);
  }

  handleResolution = mediaQueryList => {
    this.setState({
      isMobile: mediaQueryList.matches
    });
  };

  handleRgbStringChange = rgbString => {
    document.body.style = `background-color: ${rgbString}`
  };

  render() {
    return (
      <div className="root" style={{ paddingTop: PADDING_TOP }}>
        <ScrollingColorBackground
          selector=".section[data-background-color]"
          colorDataAttribute="data-background-color"
          initialRgb="rgb(32, 202, 172)"
          style={{
            zIndex: -1,
            position: "fixed",
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px"
          }}
          onChange={this.handleRgbStringChange}
        />

        <div className="ball isFixed" ref={this.ball} />

        <section className="section" data-background-color="rgb(32, 202, 172)">
          <div className="wrapper wrapper1">
            <div className="trigger" ref={this.trigger1} />
            <div className="target" ref={this.target1} />
          </div>
        </section>

        <section className="section" data-background-color="rgb(60, 191, 246)">
          <div className="wrapper wrapper2">
            <div className="trigger" ref={this.trigger2} />
            <div className="target" ref={this.target2} />
          </div>
        </section>

        <section className="section" data-background-color="rgb(160, 91, 126)">
          <div className="wrapper wrapper3">
            <div className="trigger" ref={this.trigger3} />
            <div className="target" ref={this.target3} />
          </div>
        </section>

        <div className="trigger" />

        <section className="section" data-background-color="rgb(160, 91, 126)">
          <div className="spacer" />
          <div className="spacer" />
        </section>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
