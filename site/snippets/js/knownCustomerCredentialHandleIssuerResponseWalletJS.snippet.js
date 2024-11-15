export default "let walletStorage = {\n  credentialIssuer: null,\n  preAuthorizedCode: null,\n  credentialEndpoint: null,\n  tokenEndpoint: null,\n  accessToken: null,\n  cNonce: null,\n};\n\nfunction handleIssuerResponse(issuerResponse) {\n  const { credential_issuer, grants } = issuerResponse.credential_offer;\n  const preAuthorizedCode =\n    grants['urn:ietf:params:oauth:grant-type:pre-authorized_code'];\n\n  /***********************************************************************\n   * Store the credential_issuer URL and pre_authorized_code for future use\n   ************************************************************************/\n  walletStorage.credentialIssuer = credential_issuer;\n  walletStorage.preAuthorizedCode = preAuthorizedCode;\n\n  if (issuerResponse.url) {\n    // Direct the user to this URL to complete their Identity Verification\n    openIdvForm(issuerResponse.url);\n  } else {\n    fetchIssuerMetadata(); // function shown in next step\n  }\n}\n";