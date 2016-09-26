import Ember from 'ember';

export default Ember.Service.extend({
  tickCount: 0,
  song: null,
  isPlaying: false,

  play() {
    this.setProperties({
      tickCount: 0,
      isPlaying: true
    });
    this.tick();
  },

  tick() {
    if(this.get('isPlaying')) {
      let tickCount = this.incrementProperty('tickCount');

      this.playCurrentTick(tickCount);
      Ember.run.later(this, this.tick, this.get('tickInterval'));
    }
  },

  playCurrentTick(tickCount) {
    let song = this.get('song');
    song.setTick(tickCount);
    // let notes = song.getNotes();
    //play each note
  },

  stop() {
    this.set('isPlaying', false);
  },

  tempo: Ember.computed.alias('song.tempo'),

  tickInterval: Ember.computed('song.tempo', function() {
    let beatsPerSecond = this.get('song.tempo') / 60;
    let sixteenthsPerSecond = beatsPerSecond * 4;
    let tickInterval = 1000 / sixteenthsPerSecond;
    return tickInterval;
  }),

  display: Ember.computed('bars', 'beats', 'sixteenths', function() {
    let bars = this.get('bars');
    let beats = this.get('beats');
    let sixteenths = this.get('sixteenths');

    return `${bars}:${beats}:${sixteenths}`;
  }),

  bars: Ember.computed('tickCount', function() {
    return Math.floor(this.get('tickCount') / 16) + 1;
  }),

  beats: Ember.computed('tickCount', function() {
    return (Math.floor((this.get('tickCount')) / 4) % 4) + 1;
  }),

  sixteenths: Ember.computed('tickCount', function() {
    return (this.get('tickCount') % 4) + 1;
  })
});
