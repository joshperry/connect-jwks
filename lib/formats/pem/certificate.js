var forge = require('node-forge')
  , pki = forge.pki;

module.exports = function() {
  
  return function pemCertificate(data, done) {
    var cert;
    try {
      cert = pki.certificateFromPem(data);
      cert.getFingerprint = function() { return pki.getPublicKeyFingerprint(cert.publicKey, { encoding: 'hex' }); };
    } catch (ex) {
      if (ex instanceof Error) {
        return done(ex);
      }
      return done(new Error(ex.message || 'Failed to parse as PEM-encoded certificate'));
    }
    return done(null, cert, 'certificate');
  };
};
