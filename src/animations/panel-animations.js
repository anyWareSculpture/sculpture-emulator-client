const {LightArray} = require('@anyware/game-logic');


export default class PanelAnimations {
  static playSuccessAnimation(handleAnimationFrame, completeCallback) {
    // frames are a list of pairs for panel indices that are on
    const frames = [
                              [['2', '0']],
                  [['1', '0'], ['2', '1']],
      [['0', '0'], ['1', '1'], ['2', '2']],
      [['0', '1'], ['1', '2'], ['2', '3']],
      [['0', '2'], ['1', '3'], ['2', '4']],
      [['0', '3'], ['1', '4'], ['2', '5']],
      [['0', '4'], ['1', '5'], ['2', '6']],
      [['0', '5'], ['1', '6'], ['2', '7']],
      [['0', '6'], ['1', '7'], ['2', '8']],
      [['0', '7'], ['1', '8'], ['2', '9']],
      [['0', '8'], ['1', '9']],
      [['0', '9']],
                             [['2', '0']],
                  [['1', '0'], ['2', '1']],
      [['0', '0'], ['1', '1'], ['2', '2']],
      [['0', '1'], ['1', '2'], ['2', '3']],
      [['0', '2'], ['1', '3'], ['2', '4']],
      [['0', '3'], ['1', '4'], ['2', '5']],
      [['0', '4'], ['1', '5'], ['2', '6']],
      [['0', '5'], ['1', '6'], ['2', '7']],
      [['0', '6'], ['1', '7'], ['2', '8']],
      [['0', '7'], ['1', '8'], ['2', '9']],
      [['0', '8'], ['1', '9']],
      [['0', '9']]
    ];
    this.playAnimation(frames, 'success', 50, handleAnimationFrame, completeCallback);
  }

    static playFailureAnimation(handleAnimationFrame, completeCallback) {
    // frames are a list of pairs for panel indices that are on
    const frames = [
    [['0', '0'], ['2', '0'],
            ['1', '1'],
      ['0', '2'], ['2', '2'],
            ['1', '3'],
      ['0', '4'], ['2', '4'],
            ['1', '5'],
      ['0', '6'], ['2', '6'],
            ['1', '7'],
      ['0', '8'], ['2', '8'],
            ['1', '9']
    ]
    ];
    this.playAnimation(frames, 'error', 300, handleAnimationFrame, completeCallback);
  }

  static playAnimation(frames, color, timeout, handleAnimationFrame, completeCallback) {

    let Panels = new LightArray({
        // stripId : number of panels
        '0': 10,
        '1': 10,
        '2': 10
      });
    console.log(Panels);

    const playFrame = (frameIdx) => {
      let frame = frames[frameIdx];
      // translate indices into panel intensities
      // for each light index in frame, set intensity in object
      _.each(frame, (light) => {
        Panels.setIntensity(light[0], light[1], 100);
        Panels.setColor(light[0], light[1], color);
      }, this);

      handleAnimationFrame(Panels);

      // reset intensity to 0
      _.each(frame, (light) => {
        console.log(light);
        Panels.setIntensity(light[0], light[1], 0);
      }, this);

      let nextFn;
      if (frameIdx < frames.length) {
        nextFn = () => { playFrame(frameIdx + 1); };
      }
      else {
        nextFn = completeCallback;
      }
      setTimeout(nextFn, timeout);
    }.bind(this);
    playFrame(0);
  }
}
