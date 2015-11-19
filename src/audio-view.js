const SculptureStore = require('@anyware/game-logic/lib/sculpture-store');
import {Sound, VCFSound} from './audio-api';

export default class AudioView {
  constructor(store, config, dispatcher) {
    this.store = store;
    this.config = config;
    this.store.on(SculptureStore.EVENT_CHANGE, this._handleChanges.bind(this));

    // FIXME: Somehow wait until all sounds have loaded before attempting to play them
    const ambientLoop = new VCFSound({url:'sounds/Alone_Mode/Pulse_Amb_Loop.wav', loop: true, fadeIn: 3});
    this.handShake = new Sound({url:'sounds/Alone_Mode/Hand_Shake_01.wav'});

    this.panelsounds = [];
    for (let j=0;j<3;j++) {
      const strip = [];
      for (let i=0;i<10;i++) {
        const soundid = j*10+i;
        strip.push(new Sound({url: `sounds/Game_01/G01_LED_${("0"+(soundid+1)).slice(-2)}.wav`}));
      }
      this.panelsounds.push(strip);
    }

    this.moleSuccessSound = new Sound({url:'sounds/Game_01/G01_Success_01.wav'});
    this.moleFailureSound = new Sound({url:'sounds/Game_01/G01_Negative_01.wav'});

  }

  _handleChanges(changes) {
    if (this._animating) {
      return;
    }
    this._handleHandshakeChanges(changes);
//    this._handleStatusChanges(changes);
    this._handleLightChanges(changes);
  }

  _handleHandshakeChanges(changes) {
    if (changes.handshakes) {
      // Did someone shake my hand?
      if (changes.handshakes[this.config.username]) {
        this.handShake.play();
      }
    }
  }

  _handleStatusChanges(changes) {
    const self = this;
    if (this.store.isPlayingMoleGame && changes.status) {
      const status = changes.status;
      const statusAnimations = {
        [SculptureStore.STATUS_SUCCESS]: function() {self.moleSuccessSound.play();},
        [SculptureStore.STATUS_FAILURE]: function() {self.moleFailureSound.play();}
      };
      
      const animationMethod = statusAnimations[status];
      if (animationMethod) {
        animationMethod();
      }
    }
  }

  _handleLightChanges(changes) {
    const lightChanges = changes.lights;
    if (!lightChanges || !this.store.isReady) {
      return;
    }
    
    if (this.store.isPlayingMoleGame) {
      const lightArray = this.lightArray;
      for (let stripId of Object.keys(lightChanges)) {
        const panels = lightChanges[stripId].panels;
        for (let panelId of Object.keys(panels)) {
          const panelChanges = panels[panelId];
          if (panelChanges.hasOwnProperty("active")) {
            if (panelChanges.active) {
              const molegame = this.store.currentGameLogic;
              const moledata = this.store.data.get('mole');
              const currentTarget = molegame.getTargetPanels(moledata.get('targetIndex'));

              // FIXME: The problem here is that currentTarget gets removed by the MoleGameLogic before this event reaches us. We may have to transport this info in the changes object as that's currently not done.

              if (currentTarget.has(stripId, panelId)) {
                this.moleSuccessSound.play();
              }
              else {
                this.moleFailureSound.play();
//                console.log(`Play ${stripId}:${panelId}`);
//                this.panelsounds[stripId][panelId].play();
              }
            }
          }
          
        }
      }
    }
  }

  get lightArray() {
    return this.store.data.get('lights');
  }
}
