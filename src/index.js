import promisescript from 'promisescript';
/* eslint-disable id-match, no-undef, no-console */
export default class Reacti13nTealium {

  constructor(config) {
    this.config = config;
  }

  get eventHandlers() {
    return {
      pageview: this.pageview.bind(this),
    };
  }

  ensureScriptHasLoaded() {
    if (!this.script) {
      const pTealium = typeof this.config.loadExternalScript === 'function' ?
        this.config.loadExternalScript() :
        promisescript({
          url: '//tags.tiqcdn.com/utag/teg/unicorn/dev/utag.js',
          type: 'script',
        });
      this.script = pTealium.then(() => !(typeof window === 'undefined'))
      .catch((event) => {
        console.error('An error loading or executing Tealium has occured: ', event.message);
      });
    }
    return this.script;
  }

  generatePayload(payload, eventName) {
    const eventHandler = this.config.eventHandlers[eventName];
    let props = {};
    if (payload && payload.i13nNode && payload.i13nNode.getMergedModel) {
      props = Object.assign(payload, payload.i13nNode.getMergedModel());
    }
    if (eventHandler) {
      return eventHandler(props);
    }
    return props;
  }

  /* eslint-disable no-unused-vars */
  pageview(payload, pageViewCallback) {
    return this.ensureScriptHasLoaded().then(() => (
      this.updateUtagData(this.generatePayload(payload, 'pageview'), pageViewCallback)
    ));
  }

  updateUtagData(additionalTrackingProps, updateUtagCallback) {
    window.utag.view(utag_data);
    return Promise.resolve().then(updateUtagCallback);
  }

}
