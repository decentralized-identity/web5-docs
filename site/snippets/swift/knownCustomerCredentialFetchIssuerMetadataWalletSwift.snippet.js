export default "func fetchIssuerMetadata() async throws {\n    guard let credentialIssuerURL = walletStorage.credentialIssuer else {\n        throw MetadataError.credentialIssuerURLNotSet\n    }\n    \n    let issuerMetadataUrl = credentialIssuerURL.appendingPathComponent(\".well-known/openid-credential-issuer\")\n    \n    let (data, response) = try await URLSession.shared.data(from: issuerMetadataUrl)\n    guard (response as? HTTPURLResponse)?.statusCode == 200 else {\n        throw MetadataError.networkError(\"Non-200 response from the server\")\n    }\n\n    guard let issuerMetadata = try? JSONSerialization.jsonObject(with: data) as? [String: Any],\n        let credentialEndpointString = issuerMetadata[\"credential_endpoint\"] as? String,\n        let credentialEndpointURL = URL(string: credentialEndpointString) else {\n        throw MetadataError.dataParsingError(\"Failed to parse JSON or missing 'credential_endpoint'\")\n    }\n    /**********************************************\n    * Store the credential endpoint for future use\n    **********************************************/\n\n    walletStorage.credentialEndpoint = credentialEndpointURL\n\n    try await fetchAuthServerMetadata() // function shown in next steps \n}\n";