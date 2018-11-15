import React, {Component} from "react";
import ReactDOM from "react-dom";
import ScrollMagic from "scrollmagic";
import {TweenMax, TimelineMax} from "gsap";
import "animation.gsap"
import "debug.addIndicators"
import {AnimatedBg, Transition} from 'scroll-background';

import "./styles.css";

const
  element = document.documentElement,
  page = document.getElementsByTagName("body")[0],
  pageWidth = window.innerWidth || element.clientWidth || page.clientWidth,
  pageHeight = window.innerHeight || element.clientHeight || page.clientHeight;

const flightpath = {
  entry: {
    // curviness: 1.25,
    // autoRotate: true,
    values: [{x: 0, y: 0}, {x: 300, y: 0}]
  },
  looping: {
    // curviness: 1.25,
    // autoRotate: true,
    values: [
      {x: 510, y: 0},
      {x: 620, y: 0},
      {x: 500, y: 0},
      {x: 620, y: 0}
    ]
  },
  leave: {
    // curviness: 1.25,
    // autoRotate: true,
    values: [
      {x: 660, y: 0},
      {x: 400, y: 0},
      {x: 0, y: 0}
    ]
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.controller = new ScrollMagic.Controller();
    // this.scene = new ScrollMagic.Scene();
    this.tween = new TimelineMax();
    this.ball = React.createRef();
    this.trigger = React.createRef();
    this.target = React.createRef();
  }

  componentDidMount() {
    const sceneConfig = {triggerElement: this.trigger, duration: 1510, offset: 0};

    const tween = this.tween
      .add(
        TweenMax.to(this.ball.current, 1.2, {
          css: {bezier: flightpath.entry},
          // ease: Power1.easeInOut
        })
      )
      .add(
        TweenMax.to(this.ball.current, 2, {
          css: {bezier: flightpath.looping},
          // ease: Power1.easeInOut
        })
      )
      .add(
        TweenMax.to(this.ball.current, 1, {
          css: {bezier: flightpath.leave},
          // ease: Power1.easeInOut
        })
      );

    new ScrollMagic.Scene(sceneConfig)
      .setPin(this.target.current)
      .setTween(tween)
      .addIndicators() // add indicators (requires plugin)
      .addTo(this.controller);
  }

  render() {
    return (
      <div className="App">
        <AnimatedBg>
          <div className="spacer"/>
          <Transition key={1} height="400px" from="#0D47A1" to="#388E3C" />
          <div className="s.target" ref="target">
            <div className="ball" ref={this.ball}/>
          </div>
          <div className="spacer"/>
          <Transition key={2} height="400px" from="#388E3C" to="#FFA000" position={0.75}/>
          <div className="trigger" ref={this.trigger}/>
          <div className="spacer"/>
          <Transition key={3} height="400px" from="#FFA000" to="#0D47A1" position={0.75}/>
          <div className="spacer"/>
        </AnimatedBg>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
