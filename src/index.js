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

// const onCompleteFunc = item => () => {
//   console.log(item);
// };
//
// const sceneEventFunc = event => {
//   const logger = () => console.log("Event fired! (" + event.type + ")");
//
//   if (
//     event.type === "start" ||
//     event.type === "leave" ||
//     event.type === "end"
//   ) {
//     logger();
//   }
// };

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

class App extends Component {
  constructor(props) {
    super(props);
    this.controller1 = new ScrollMagic.Controller();
    this.controller2 = new ScrollMagic.Controller();
    // this.scene = new ScrollMagic.Scene();
    this.tween1 = new TimelineLite();
    this.tween2 = new TimelineLite();
    this.ball = React.createRef();
    this.trigger1 = React.createRef();
    this.trigger2 = React.createRef();
    this.target1 = React.createRef();
    this.target2 = React.createRef();
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
      // offset: 388,
      // triggerHook: this.state.isMobile ? 0.75 : .5
    };
    const scene2Config = {
      triggerElement: this.trigger2.current,
      duration: 1080,
      triggerHook: PADDING_TOP / pageHeight
      // offset: 388,
      // triggerHook: this.state.isMobile ? 0.75 : .5
    };

    // const steppedEase = new SteppedEase(5);

    const tween1 = this.tween1
      .add(
        TweenLite.to(this.ball.current, 1.13, {
          css: { bezier: flightpath1["1"] },
          // ease: Power0.easeNone
        })
      )
      .add(
        TweenLite.to(this.ball.current, 1.36, {
          css: { bezier: flightpath1["2"] },
          ease: SteppedEase.config(12),
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
          ease: SteppedEase.config(12),
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
          ease: SteppedEase.config(12),
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
          ease: SteppedEase.config(12),
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

    new ScrollMagic.Scene(scene1Config)
      // .on("change update progress start end enter leave", sceneEventFunc)
      .setPin(this.target1.current)
      .setTween(tween1)
      .addIndicators() // add indicators (requires plugin)
      .addTo(this.controller1);

    new ScrollMagic.Scene(scene2Config)
      // .on("change update progress start end enter leave", sceneEventFunc)
      .setPin(this.target2.current)
      .setTween(tween2)
      .addIndicators() // add indicators (requires plugin)
      .addTo(this.controller2);
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
    // console.log(this.state.isMobile);
    // console.log(PADDING_TOP/pageHeight);
    // console.log(this.backgroundSection.current && this.backgroundSection.current.state ? this.backgroundSection.current.state.rgbString : null);
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
