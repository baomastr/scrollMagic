import React, { Component } from "react";
import ReactDOM from "react-dom";
import ScrollMagic from "scrollmagic";
import { TweenLite, TimelineLite, SteppedEase, Power0 } from "gsap";
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

const ballPaths1 = [
  {
    x: {
      values: [{ x: 0 }, { x: 280 }]
    },
    y: 1.13
  },
  {
    x: {
      values: [{ x: 280 }, { x: 94 }]
    },
    y: 1.36
  },
  {
    x: {
      values: [{ x: 94 }, { x: -60 }]
    },
    y: 0.61
  },
  {
    x: {
      values: [{ x: -60 }, { x: -230 }]
    },
    y: 1.05
  },
  {
    x: {
      values: [{ x: -230 }, { x: -335 }]
    },
    y: 0.61
  },
  {
    x: {
      values: [{ x: -335 }, { x: 0 }]
    },
    y: 1.2
  }
];

const ballPaths2 = [
  {
    x: {
      values: [{ x: 0 }, { x: 128 }]
    },
    y: 0.87
  },
  {
    x: {
      values: [{ x: 128 }, { x: 157 }]
    },
    y: 0.67
  },
  {
    x: {
      values: [{ x: 157 }, { x: 128 }]
    },
    y: 0.67
  },
  {
    x: {
      values: [{ x: 128 }, { x: -16 }]
    },
    y: 2.38
  },
  {
    x: {
      values: [{ x: -16 }, { x: -45 }]
    },
    y: 0.67
  },
  {
    x: {
      values: [{ x: -45 }, { x: -16 }]
    },
    y: 0.67
  },
  {
    x: {
      values: [{ x: -16 }, { x: 13 }]
    },
    y: 0.67
  },
  {
    x: {
      values: [{ x: 13 }, { x: -16 }]
    },
    y: 0.67
  },
  {
    x: {
      values: [{ x: -16 }, { x: -228 }]
    },
    y: 1.49
  },
  {
    x: {
      values: [{ x: -228 }, { x: -257 }]
    },
    y: 0.67
  },
  {
    x: {
      values: [{ x: -257 }, { x: -228 }]
    },
    y: 0.67
  },
  {
    x: {
      values: [{ x: -228 }, { x: -30 }]
    },
    y: 1.73
  },
  {
    x: {
      values: [{ x: -30 }, { x: 0 }]
    },
    y: 1.12
  }
];

const ballPaths3 = [
  {
    x: {
      values: [{ x: 0 }, { x: 255 }]
    },
    y: 1.25
  },
  {
    x: {
      values: [{ x: 255 }, { x: 289 }]
    },
    y: 0.467
  },
  {
    x: {
      values: [{ x: 289 }, { x: 255 }]
    },
    y: 0.467
  },
  {
    x: {
      values: [{ x: 255 }, { x: 108 }]
    },
    y: 1.625
  },
  {
    x: {
      values: [{ x: 108 }, { x: -290 }]
    },
    y: 1.933
  },
  {
    x: {
      values: [{ x: -290 }, { x: -324 }]
    },
    y: 0.467
  },
  {
    x: {
      values: [{ x: -324 }, { x: -290 }]
    },
    y: 0.467
  },
  {
    x: {
      values: [{ x: -290 }, { x: -144 }]
    },
    y: 1.608
  },
  {
    x: {
      values: [{ x: -144 }, { x: 0 }]
    },
    y: 0.717
  }
];

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
    this.backgroundSection = React.createRef();
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
        TweenLite.to(this.ball.current, item.y, {
          css: { bezier: item.x },
          ease: Power0.easeNone
        })
      );
    });

    ballPaths2.forEach(item => {
      return this.tween2.add(
        TweenLite.to(this.ball.current, item.y, {
          css: { bezier: item.x },
          ease: Power0.easeNone
        })
      );
    });

    ballPaths3.forEach(item => {
      return this.tween3.add(
        TweenLite.to(this.ball.current, item.y, {
          css: { bezier: item.x },
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
          ref={this.backgroundSection}
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
