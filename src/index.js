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


const flightpath1 = {
  "1": {
    values: [{ x: 0 }, { x: 280 }]
  },
  "2": {
    values: [{ x: 280 }, { x: 94 }]
  },
  "3": {
    values: [{ x: 94 }, { x: -60 }]
  },
  "4": {
    values: [{ x: -60 }, { x: -230 }]
  },
  "5": {
    values: [{ x: -230 }, { x: -335 }]
  },
  "6": {
    values: [{ x: -335 }, { x: 0 }]
  }
};

const flightpath2 = {
  "1": {
    values: [{ x: 0 }, { x: 128 }]
  },
  "2": {
    values: [{ x: 128 }, { x: 157 }]
  },
  "3": {
    values: [{ x: 157 }, { x: 128 }]
  },
  "4": {
    values: [{ x: 128 }, { x: -16 }]
  },
  "5": {
    values: [{ x: -16 }, { x: -45 }]
  },
  "6": {
    values: [{ x: -45 }, { x: -16 }]
  },
  "7": {
    values: [{ x: -16 }, { x: 13 }]
  },
  "8": {
    values: [{ x: 13 }, { x: -16 }]
  },
  "9": {
    values: [{ x: -16 }, { x: -228 }]
  },
  "10": {
    values: [{ x: -228 }, { x: -257 }]
  },
  "11": {
    values: [{ x: -257 }, { x: -228 }]
  },
  "12": {
    values: [{ x: -228 }, { x: -30 }]
  },
  "13": {
    values: [{ x: -30 }, { x: 0 }]
  }
};

const flightpath3 = {
  "1": {
    values: [{ x: 0 }, { x: 255 }]
  },
  "2": {
    values: [{ x: 255 }, { x: 289 }]
  },
  "3": {
    values: [{ x: 289 }, { x: 255 }]
  },
  "4": {
    values: [{ x: 255 }, { x: 108 }]
  },
  "5": {
    values: [{ x: 108 }, { x: -290 }]
  },
  "6": {
    values: [{ x: -290 }, { x: -324 }]
  },
  "7": {
    values: [{ x: -324 }, { x: -290 }]
  },
  "8": {
    values: [{ x: -290 }, { x: -144 }]
  },
  "9": {
    values: [{ x: -144 }, { x: 0 }]
  }
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

    const scene1Config = {
      triggerElement: this.trigger1.current,
      duration: 1080,
      triggerHook: PADDING_TOP / pageHeight
    };
    const scene2Config = {
      triggerElement: this.trigger2.current,
      duration: 1080,
      triggerHook: PADDING_TOP / pageHeight
    };
    const scene3Config = {
      triggerElement: this.trigger3.current,
      duration: 1080,
      triggerHook: PADDING_TOP / pageHeight
    };


    const tween1 = this.tween1
      .add(
        TweenLite.to(this.ball.current, 1.13, {
          css: { bezier: flightpath1["1"] },
        })
      )
      .add(
        TweenLite.to(this.ball.current, 1.36, {
          css: { bezier: flightpath1["2"] },
          ease: Power0.easeNone,
        })
      )
      .add(
        TweenLite.to(this.ball.current, 0.61, {
          css: { bezier: flightpath1["3"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 1.05, {
          css: { bezier: flightpath1["4"] },
          ease: Power0.easeNone,
        })
      )
      .add(
        TweenLite.to(this.ball.current, 0.61, {
          css: { bezier: flightpath1["5"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 1.2, {
          css: { bezier: flightpath1["6"] },
          ease: Power0.easeNone
        })
      );


    const tween2 = this.tween2
      .add(
        TweenLite.to(this.ball.current, 0.87,{
          css: { bezier: flightpath2["1"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 0.67,{
          css: { bezier: flightpath2["2"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 0.67,{
          css: { bezier: flightpath2["3"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 2.38,{
          css: { bezier: flightpath2["4"] },
          ease: Power0.easeNone,
        })
      )
      .add(
        TweenLite.to(this.ball.current, 0.67,{
          css: { bezier: flightpath2["5"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 0.67,{
          css: { bezier: flightpath2["6"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 0.67,{
          css: { bezier: flightpath2["7"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 0.67,{
          css: { bezier: flightpath2["8"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 1.49,{
          css: { bezier: flightpath2["9"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 0.67,{
          css: { bezier: flightpath2["10"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 0.67,{
          css: { bezier: flightpath2["11"] },
          ease: Power0.easeNone,
        })
      )
      .add(
        TweenLite.to(this.ball.current, 1.73,{
          css: { bezier: flightpath2["12"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 1.12,{
          css: { bezier: flightpath2["13"] },
          ease: Power0.easeNone
        })
      );

    const tween3 = this.tween3
      .add(
        TweenLite.to(this.ball.current, 1.25, {
          css: { bezier: flightpath3["1"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 0.467, {
          css: { bezier: flightpath3["2"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 0.467, {
          css: { bezier: flightpath3["3"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 1.625, {
          css: { bezier: flightpath3["4"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 1.933, {
          css: { bezier: flightpath3["5"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 0.467, {
          css: { bezier: flightpath3["6"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 0.467, {
          css: { bezier: flightpath3["7"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 1.608, {
          css: { bezier: flightpath3["8"] },
          ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 0.717, {
          css: { bezier: flightpath3["9"] },
          ease: Power0.easeNone
        })
      );

    new ScrollMagic.Scene(scene1Config)
      .setPin(this.target1.current)
      .setTween(tween1)
      .addTo(this.controller1);

    new ScrollMagic.Scene(scene2Config)
      .setPin(this.target2.current)
      .setTween(tween2)
      .addTo(this.controller2);

    new ScrollMagic.Scene(scene3Config)
      .setPin(this.target3.current)
      .setTween(tween3)
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
