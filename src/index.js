import promisescript from 'promisescript';
/* eslint-disable id-match, no-undef, no-console */
export default class Reacti13nTealium {

  constructor(config) {
    this.config = {
      account: 'dev',
      externalScript: {
        folder: '//tags.tiqcdn.com/utag/teg/unicorn',
        fileName: 'utag.js',
      },
      ...config
    }
    this.config.externalScript = `${ this.config.externalScript.folder }/${ this.config.account }/${ this.config.externalScript.fileName }`;
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
          url: this.config.externalScript,
          type: 'script',
          exposed: 'utag',
        });
      this.script = pTealium.then(() => window.utag)
      .catch((event) => {
        console.error('An error loading or executing Tealium has occured: ', event.message);
        throw event;
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
  pageview(payload) {
    return this.ensureScriptHasLoaded().then(() => (
      this.updateUtagData(this.generatePayload(payload, 'pageview'))
    ));
  }

  updateUtagData(additionalTrackingProps) {
    /* eslint-disable camelcase */
    // Set initial value for utag_data.
    window.utag_data = additionalTrackingProps;
    window.utag.view(additionalTrackingProps);
    return Promise.resolve();
  }

}
