// This config is for example only.
const TealiumConfig = {
  account: 'dev',
  externalScript: {
    folder: '//tags.tiqcdn.com/utag/teg/unicorn',
    fileName: 'utag.js',
  },
  eventHandlers: {
    pageview(nodeProps, User = { status: 'anonymous' }) {
      // Do your custom manipultaion here.
      return {
        first: 'a',
        second: 'b',
        user: User,
      };
    },
  },
};
export default TealiumConfig;
