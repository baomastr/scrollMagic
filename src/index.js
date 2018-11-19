import React, { Component } from "react";
import ReactDOM from "react-dom";
import ScrollMagic from "scrollmagic";
import { TweenMax, TimelineMax } from "gsap";
import "animation.gsap";
import "debug.addIndicators";
import ScrollingColorBackground from "react-scrolling-color-background";

import "./styles.css";

const element = document.documentElement,
  page = document.getElementsByTagName("body")[0],
  pageWidth = window.innerWidth || element.clientWidth || page.clientWidth,
  pageHeight = window.innerHeight || element.clientHeight || page.clientHeight;

const onCompleteFunc = item => () => {
  console.log(item);
};

const sceneEventFunc = event => {
  const logger = () => console.log("Event fired! (" + event.type + ")");

  if (
    event.type === "start" ||
    event.type === "leave" ||
    event.type === "end"
  ) {
    logger();
  }
};

const flightpath1 = {
  "1": {
    values: [{ x: 0, onComplete: onCompleteFunc("1 started") }, { x: 280 }]
  },
  "2": {
    values: [{ x: 280, onComplete: onCompleteFunc("2 started") }, { x: 94 }]
  },
  "3": {
    values: [{ x: 94, onComplete: onCompleteFunc("3 started") }, { x: -60 }]
  },
  "4": {
    values: [{ x: -60, onComplete: onCompleteFunc("4 started") }, { x: -230 }]
  },
  "5": {
    values: [{ x: -230, onComplete: onCompleteFunc("5 started") }, { x: -335 }]
  },
  "6": {
    values: [{ x: -335, onComplete: onCompleteFunc("6 started") }, { x: 0 }]
  }
};

const flightpath2 = {
  "1": {
    values: [{ x: 0, onComplete: onCompleteFunc("1 started") }, { x: 280 }]
  },
  "2": {
    values: [{ x: 280, onComplete: onCompleteFunc("2 started") }, { x: 94 }]
  },
  "3": {
    values: [{ x: 94, onComplete: onCompleteFunc("3 started") }, { x: -60 }]
  },
  "4": {
    values: [{ x: -60, onComplete: onCompleteFunc("4 started") }, { x: -230 }]
  },
  "5": {
    values: [{ x: -230, onComplete: onCompleteFunc("5 started") }, { x: -335 }]
  },
  "6": {
    values: [{ x: -335, onComplete: onCompleteFunc("6 started") }, { x: 0 }]
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.controller1 = new ScrollMagic.Controller();
    this.controller2 = new ScrollMagic.Controller();
    // this.scene = new ScrollMagic.Scene();
    this.tween1 = new TimelineMax();
    this.tween2 = new TimelineMax();
    this.ball = React.createRef();
    this.trigger1 = React.createRef();
    this.trigger2 = React.createRef();
    this.target1 = React.createRef();
    this.target2 = React.createRef();
  }

  componentDidMount() {
    const scene1Config = {
      triggerElement: this.trigger1.current,
      duration: 1080,
      offset: 388
    };
    const scene2Config = {
      triggerElement: this.trigger2.current,
      duration: 1080,
      offset: 388
    };

    const tween1 = this.tween1
      .add(
        TweenMax.to(this.ball.current, 1.13, {
          css: { bezier: flightpath1["1"] }
        })
      )
      .add(
        TweenMax.to(this.ball.current, 1.36, {
          css: { bezier: flightpath1["2"] }
        })
      )
      .add(
        TweenMax.to(this.ball.current, 0.61, {
          css: { bezier: flightpath1["3"] }
        })
      )
      .add(
        TweenMax.to(this.ball.current, 1.05, {
          css: { bezier: flightpath1["4"] }
        })
      )
      .add(
        TweenMax.to(this.ball.current, 0.61, {
          css: { bezier: flightpath1["5"] }
        })
      )
      .add(
        TweenMax.to(this.ball.current, 1.2, {
          css: { bezier: flightpath1["6"] }
        })
      );

    const tween2 = this.tween2
      .add(
        TweenMax.to(this.ball.current, 1.13, {
          css: { bezier: flightpath2["1"] }
        })
      )
      .add(
        TweenMax.to(this.ball.current, 1.36, {
          css: { bezier: flightpath2["2"] }
        })
      )
      .add(
        TweenMax.to(this.ball.current, 0.61, {
          css: { bezier: flightpath2["3"] }
        })
      )
      .add(
        TweenMax.to(this.ball.current, 1.05, {
          css: { bezier: flightpath2["4"] }
        })
      )
      .add(
        TweenMax.to(this.ball.current, 0.61, {
          css: { bezier: flightpath2["5"] }
        })
      )
      .add(
        TweenMax.to(this.ball.current, 1.2, {
          css: { bezier: flightpath2["6"] }
        })
      );

    new ScrollMagic.Scene(scene1Config)
      .on("change update progress start end enter leave", sceneEventFunc)
      .setPin(this.target1.current)
      .setTween(tween1)
      .addIndicators() // add indicators (requires plugin)
      .addTo(this.controller1);

    new ScrollMagic.Scene(scene2Config)
      .on("change update progress start end enter leave", sceneEventFunc)
      .setPin(this.target2.current)
      .setTween(tween2)
      .addIndicators() // add indicators (requires plugin)
      .addTo(this.controller2);
  }

  render() {
    return (
      <div className="root">

        <ScrollingColorBackground
          selector=".section[data-background-color]"
          colorDataAttribute="data-background-color"
          initialRgb="rgb(0, 0, 0)"
          style={{
            zIndex: -1,
            position: "fixed",
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px"
          }}
        />

        <div className="ball" ref={this.ball} />

        <section className="section" data-background-color="rgb(32, 202, 172)">
          <div className="wrapper wrapper1">
            <div className="trigger" ref={this.trigger1} />
            <div className="target" ref={this.target1} />
          </div>
        </section>

        <section className="section" data-background-color="rgb(60, 191, 246)">
          <div className="wrapper wrapper1">
            <div className="trigger" ref={this.trigger2} />
            <div className="target" ref={this.target2} />
          </div>
        </section>

        <div className="spacer" />
        <div className="spacer" />

      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
