
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 791, hash: 'd0bc8636b03f801b76014bab3ce0956cdf7e6bb992ca4c690b75d8cdc6038ecb', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1125, hash: '3014eabf016ef8ebc40616fad26cea3f2ce34bde060c544ca0d7fc2ed8a254e5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-4O5FHHO7.css': {size: 665, hash: 'urp81LWLxnM', text: () => import('./assets-chunks/styles-4O5FHHO7_css.mjs').then(m => m.default)}
  },
};
