export default "function fetchAuthServerMetadata() {\n  /*******************************************\n   * Fetch the authorization server's metadata\n   *******************************************/\n  const authServerMetadataUrl = `${walletStorage.credentialIssuer}/.well-known/oauth-authorization-server`;\n  fetch(authServerMetadataUrl)\n    .then((response) => response.json())\n    .then((authServerMetadata) => {\n      /****************************************************\n       * Extract and store the token_endpoint for future use\n       *****************************************************/\n      walletStorage.tokenEndpoint = authServerMetadata.token_endpoint;\n      fetchAccessToken(\n        walletStorage.preAuthorizedCode,\n        walletStorage.tokenEndpoint,\n      ); // function shown in next step\n    })\n    .catch((error) => {\n      console.error(\n        `Error in fetching authorization server metadata: ${error.message}`,\n      );\n    });\n}\n";