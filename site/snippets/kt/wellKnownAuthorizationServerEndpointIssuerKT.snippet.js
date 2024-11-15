export default "get(\"/.well-known/oauth-authorization-server\") {\n    val oauthAuthorizationServerMetadata = buildJsonObject {\n        put(\"issuer\", \"https://issuer.example.com\") // URL of the Credential Issuer\n        put(\"token_endpoint\", \"https://issuer.example.com/token\") // URL for the Access Token Request\n    }\n    call.respond(HttpStatusCode.OK, oauthAuthorizationServerMetadata)\n}\n";