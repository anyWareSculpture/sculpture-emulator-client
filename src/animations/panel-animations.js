/**
 * @fileOverview Handles playing animations on the light-array frame by frame.
 */
import LightArray from 'anyware/lib/game-logic/utils/light-array';
import _ from 'lodash';

export default class PanelAnimations {
  /**
   * Plays a success animation on the light-array
   * @param  {function} handleAnimationFrame is called for each frame of the
   *         animation for dislplaying the frame data.
   *         Signature: handleAnimaitionFrame({LightArray});
   * @param  {function} completeCallback   is called when the animation is done.
   *         Signature: completeCallback();
   */
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
    this.playAnimation(
      frames,
      'success',
      50,
      handleAnimationFrame,
      completeCallback
    );
  }

  /**
   * Plays a failure animation on the light-array
   * @param  {function} handleAnimationFrame is called for each frame of the
   *         animation for dislplaying the frame data.
   *         Signature: handleAnimaitionFrame({LightArray});
   * @param  {function} completeCallback   is called when the animation is done.
   *         Signature: completeCallback();
   */
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
    // additional animation frame for longer failure animation
    // [       ['1', '0'],
    //   ['0','1'], ['2', '1'],
    //         ['1', '2'],
    //   ['0','3'], ['2', '3'],
    //         ['1', '4'],
    //   ['0','5'], ['2', '5'],
    //         ['1', '6'],
    //   ['0','7'], ['2', '7'],
    //         ['1', '8'],
    //   ['0','9'], ['2', '9']]
    ];
    this.playAnimation(
      frames,
      'error',
      500,
      handleAnimationFrame,
      completeCallback
    );
  }

  /**
   * Plays a animation on the light-array given by frames object.
   * @param  {Array} frames given as array of index pairs to update LightArray
   * @param  {string} color of lights in animation
   * @param  {Number} timeout Duration of each animation frame in ms.
   * @param  {function} handleAnimationFrame is called for each frame of the
   *         animation for displaying the frame data.
   *         Signature: handleAnimaitionFrame({LightArray});
   * @param  {function} completeCallback   is called when the animation is done.
   *         Signature: completeCallback();
   */
  static playAnimation(frames, color, timeout, handleAnimationFrame, completeCallback) {
    let Panels = new LightArray({
      // stripId : number of panels
      '0': 10,
      '1': 10,
      '2': 10
    });

    const playFrame = ((frameIdx) => {
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
    }).bind(this);
    playFrame(0);
  }
}
