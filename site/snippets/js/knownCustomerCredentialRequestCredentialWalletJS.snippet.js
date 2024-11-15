export default "function requestKnownCustomerCredential(credentialEndpoint, accessToken) {\n  if (!walletStorage.cNonce) {\n    throw new Error('cNonce is missing in Wallet storage');\n  }\n  /*************************************************\n   * Construct & sign the JWT payload\n   **************************************************/\n  const jwtPayload = {\n    iss: customerBearerDid.uri, // user's DID string\n    aud: issuerDidUri, // Issuer's DID string\n    iat: Math.floor(Date.now() / 1000),\n    nonce: walletStorage.cNonce,\n  };\n\n  Jwt.sign({ signerDid: customerBearerDid, payload: jwtPayload })\n    .then((signedJwt) => {\n      const requestBody = {\n        proof: {\n          proof_type: 'jwt',\n          jwt: signedJwt,\n        },\n      };\n      /*************************************************\n       * Request & securely store KCC\n       **************************************************/\n\n      fetch(credentialEndpoint, {\n        method: 'POST',\n        headers: {\n          // Include the access token in the Authorization header\n          'Authorization': `Bearer ${accessToken}`,\n          'Content-Type': 'application/json',\n        },\n        body: JSON.stringify(requestBody),\n      })\n        .then((response) => {\n          if (!response.ok) {\n            throw new Error(\n              `Network response was not ok: ${response.statusText}`,\n            );\n          }\n          return response.json();\n        })\n        .then((data) => {\n          if (data.credential) {\n            secureStorage.setItem('signedCredential', data.credential);\n          } else {\n            throw new Error('Signed credential not found in the response');\n          }\n        })\n        .catch((error) => {\n          throw error;\n        });\n    })\n    .catch((error) => {\n      throw new Error(`Error signing JWT: ${error.message}`);\n    });\n}\n";