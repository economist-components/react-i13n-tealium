/* eslint-disable id-match, no-undef, camelcase */
import ReactI13nTealium from '../src/index';
import TealiumConfig from '../src/example-config.js';
import chai from 'chai';
import spies from 'chai-spies';
chai.use(spies);
chai.should();
mocha.setup({ globals: [ 'utag_condload', 'utag', 'i', 'utag_data' ] });
describe('TealiumPlugin is a i13n plugin for Tealium', () => {
  describe('ensureScriptHasLoaded', () => {
    it('calls loadExternalScript if it was passed', () => {
      const loadExternalScript = chai.spy(() => Promise.resolve());
      const plugin = new ReactI13nTealium({ loadExternalScript });
      plugin.ensureScriptHasLoaded();
      loadExternalScript.should.have.been.called(1);
    });
  });
  describe('tealium plugin', () => {
    it('it calls utag.view() method with utag_data', () => {
      const TrackedApp = new ReactI13nTealium(TealiumConfig);
      TrackedApp.updateUtagData = chai.spy(() => Promise.resolve());
      return TrackedApp.pageview().then(() => {
        TrackedApp.updateUtagData.should.have.been.called(1);
        TrackedApp.updateUtagData.should.have.been.called.with({
          first: 'a',
          second: 'b',
          user: { status: 'anonymous' },
        });
      });
    });
  });
});
