import ReactI13nTealium from '../src/index';
import spies from 'chai-spies';
import { setupI13n } from 'react-i13n';
import DemoApp from '../src/demoapp';
const TrackedApp = setupI13n(DemoApp, {
  rootModelData: {
    product: 'The World If',
  },
  isViewportEnabled: true,
}, [ new Reacti13nTealium() ]);

chai.use(spies);
describe('TealiumPlugin is a i13n plugin for Tealium', () => {
  describe('ensureScriptHasLoaded', () => {
    it('calls loadExternalScript if it was passed', () => {
      const loadExternalScript = chai.spy(() => Promise.resolve());
      const plugin = new ReactI13nTealium({ ...pluginConfig, loadExternalScript });
      plugin.ensureScriptHasLoaded();
      loadExternalScript.should.have.been.called.once();
    });
  });
  describe('tealium plugin', () => {
    beforeEach(function(){
      TrackedApp.i13n.executeEvent('pageview', {
        title: 'Title of the article',
        template: 'article',
        topic: 'Science',
        publishDate: new Date(),
        // This will overwrite the default
        articleSource: 'web',
      });
    }
    );

    it('it update a global utag_data variable', () => {
      window.utag_data.should.be.deep.equal({
        node_id: "21003976",
        node_title: "Democracy in America",
        node_type: "mtblog_site",
        node_created: "1256918233",
        node_changed: "1407493549",
        node_author: "1",
        user_status: "anonymous",
        dfp_zone: "blo5",
        dfp_site: "TDQK",
        dfp_targeting: "5605\/$ENV.tdqk\/blo5",
        section: "",
        issue_date: "",
        content_source: "web",
        content_type: "blog_post_listing",
        story_title: "blog|democracy_in_america|home",
        subsection: "democracy_in_america",
      });
    });
    it('it calls utag.view() method with utag_data', () => {
      window.utag.view = chai.spy(() => Promise.resolve());
      window.utag.view.should.have.been.called.with({
        node_id: "21003976",
        node_title: "Democracy in America",
        node_type: "mtblog_site",
        node_created: "1256918233",
        node_changed: "1407493549",
        node_author: "1",
        user_status: "anonymous",
        dfp_zone: "blo5",
        dfp_site: "TDQK",
        dfp_targeting: "5605\/$ENV.tdqk\/blo5",
        section: "",
        issue_date: "",
        content_source: "web",
        content_type: "blog_post_listing",
        story_title: "blog|democracy_in_america|home",
        subsection: "democracy_in_america",
      });
    });
  });
});
