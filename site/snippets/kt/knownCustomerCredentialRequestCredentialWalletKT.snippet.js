export default "private suspend fun requestKnownCustomerCredential(credentialEndpoint: String?, accessToken: String?) {\n        val client = HttpClient()\n\n        val cNonce = WalletStorage.cNonce \n        if (cNonce == null) {\n            throw Exception(\"cNonce is missing in Wallet storage\")\n        }\n\n        /*************************************************\n        * Construct & sign the JWT payload\n        **************************************************/\n        val jwtPayload = JwtClaimsSet.Builder()\n            .issuer(userBearerDid.uri) // user's DID string\n            .audience(issuerDidUri) // Issuer's DID string \n            .issueTime(System.currentTimeMillis() / 1000) // Issued time\n            .misc(\"nonce\", cNonce)\n            .build()\n        \n        credentialEndpoint?.let { endpoint ->\n        accessToken?.let { token ->\n        try {\n            val signedJwt = Jwt.sign(userBearerDid, jwtPayload)\n\n            val requestBody = buildJsonObject {\n                putJsonObject(\"proof\") {\n                    put(\"proof_type\", \"jwt\")\n                    put(\"jwt\", signedJwt)\n                }\n            }\n\n            /*************************************************\n            * Request & securely store KCC\n            **************************************************/\n            val response: HttpResponse = client.post(endpoint) {\n                // Include the access token in the Authorization header\n                header(HttpHeaders.Authorization, \"Bearer $token\")\n                contentType(ContentType.Application.Json)\n                setBody(requestBody.toString())\n            }\n\n            if (!response.status.isSuccess()) {\n                throw Exception(\n                    \"Network response was not ok: ${response.status.description}\"\n                )\n            }\n\n            val responseData = Json.parseToJsonElement(response.bodyAsText()).jsonObject\n            responseData[\"credential\"]?.jsonPrimitive?.content?.let { signedKccJwt ->\n                secureStoreCredential(signedKccJwt)\n            } ?: throw Exception(\"Signed credential not found in the response\")\n                \n        } catch (e: Exception) {\n            println(\"Error requesting KCC: ${e.message}\")\n        } finally {\n            client.close()\n        }\n    } ?: throw IllegalArgumentException(\"accessToken cannot be null\")\n    } ?: throw IllegalArgumentException(\"credentialEndpoint cannot be null\") \n}\n";