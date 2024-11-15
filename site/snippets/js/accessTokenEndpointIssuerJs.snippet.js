export default "import { VerifiableCredential, Jwt } from '@web5/credentials';\n\nconst accessTokenToCNonceMap = new Map();\n\napp.post('/token', async (req, res) => {\n  const { grant_type, code } = req.body;\n\n  if (grant_type !== 'urn:ietf:params:oauth:grant-type:pre-authorized_code') {\n    return res.status(400).json({ error: 'unsupported_grant_type' });\n  }\n\n  const customersDidUri = preAuthCodeToDidMap.get(code);\n  if (!customersDidUri) {\n    return res.status(400).json({ error: 'invalid_grant' });\n  }\n\n  // Check the status of the IDV\n  const idvCompleted = checkIDVStatus(customersDidUri);\n  if (!idvCompleted) {\n    return res.status(400).json({ error: 'authorization_pending' });\n  }\n\n  /********************************************\n   * Create the payload for the access token\n   ********************************************/\n  const accessTokenPayload = {\n    sub: customersDidUri, // Customer's Decentralized Identifier string\n    iss: issuerBearerDid.uri, // Issuer's Decentralized Identifier string\n    iat: Math.floor(Date.now() / 1000), // Issued at\n    exp: Math.floor(Date.now() / 1000) + 86400, // Expiration time\n  };\n  /********************************************\n   * sign accessToken and generate a c_nonce\n   ********************************************/\n  try {\n    const accessToken = await Jwt.sign({\n      signerDid: issuerBearerDid,\n      payload: accessTokenPayload,\n    });\n\n    const cNonce = generateCNonce();\n    accessTokenToCNonceMap.set(accessToken, cNonce);\n\n    preAuthCodeToDidMap.delete(code);\n\n    res.json({\n      access_token: accessToken,\n      token_type: 'bearer',\n      expires_in: 86400, // Token expiration time\n      c_nonce: cNonce, // Challenge nonce to be signed\n      c_nonce_expires_in: 86400, // cNonce expiration time\n    });\n  } catch (error) {\n    return res\n      .status(500)\n      .json({ error: 'internal_server_error', message: error.message });\n  }\n});\n";