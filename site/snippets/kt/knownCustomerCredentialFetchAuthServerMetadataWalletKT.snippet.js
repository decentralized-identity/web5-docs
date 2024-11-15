export default "private suspend fun fetchAuthServerMetadata() {\n    val client = HttpClient()\n    val authServerMetadataUrl = \"${WalletStorage.credentialIssuer}/.well-known/oauth-authorization-server\"\n    try {\n        val httpResponse: HttpResponse = client.get(authServerMetadataUrl)\n        val responseText: String = httpResponse.bodyAsText()\n\n        val json = Json.parseToJsonElement(responseText).jsonObject\n        val tokenEndpoint = json[\"token_endpoint\"]?.jsonPrimitive?.content\n\n        if (tokenEndpoint != null) {\n        /****************************************************\n        * Extract and store the token_endpoint for future use\n        *****************************************************/    \n            WalletStorage.tokenEndpoint = tokenEndpoint\n\n            fetchAccessToken(\n                WalletStorage.preAuthorizedCode, \n                WalletStorage.tokenEndpoint) // function shown in next step\n        } else {\n            println(\"Token endpoint not found in the authorization server's metadata.\")\n        }\n    } catch (e: Exception) {\n        println(\"Error in fetching authorization server metadata: ${e.message}\")\n    } finally {\n        client.close()\n    }\n}\n";