/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'countryoftheday',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
      providers: {
        aws: {
          region: 'us-east-1',
          profile: 'jojo',
        },
      },
    };
  },
  async run() {
    new sst.aws.Nextjs('MyWeb');
  },
});
