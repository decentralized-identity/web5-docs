export default "get(\"/idv/siopv2/initiate\") {\n    // Construct the SIOPv2 Authorization Request\n    val siopRequest = buildJsonObject {\n        put(\"client_id\", \"did:dht:issuer7ufcbgnnc4ikkfpd8b1u9on1b1n7k7wdcapbgo\") // Issuer's Decentralized Identifier\n        put(\"scope\", \"openid\") // Standard OpenID Connect scope\n        put(\"response_type\", \"id_token vp_token\") // Expected response formats\n        put(\"response_uri\", \"https://issuer.example.com/siopv2/response\") // Endpoint for SIOP response\n        put(\"response_mode\", \"direct_post\") // Delivery method of the SIOP response\n        put(\"nonce\", \"n-0S6_WzA2Mj\") // Unique string to link the request and response\n\n        val clientMetadata = buildJsonObject {\n            put(\"subject_syntax_types_supported\", \"did:dht did:jwk\")\n            put(\"client_name\", \"Issuance Service Name\")\n            put(\"client_uri\", \"https://issuer.example.com\")\n            put(\"logo_uri\", \"https://issuer.example.com/logo.png\")\n            put(\"tos_uri\", \"https://issuer.example.com/tos\")\n            put(\"policy_uri\", \"https://issuer.example.com/privacy\")\n        }\n\n        val inputDescriptors = buildJsonArray {\n            addJsonObject {\n                put(\"id\", \"IDCardCredential\")\n                val schema = buildJsonObject {\n                    put(\"uri\", buildJsonArray {\n                        add(\"https://www.w3.org/2018/credentials#VerifiableCredential\")\n                        add(\"https://www.w3.org/2018/credentials/examples/v1#IDCardCredential\")\n                    })\n                    put(\"name\", \"ID Card Credential\")\n                    put(\"purpose\", \"We need to verify your identity.\")\n                }\n                put(\"schema\", schema)\n                val constraints = buildJsonObject {\n                    val fields = buildJsonArray {\n                        addJsonObject {\n                            put(\"path\", buildJsonArray { \n                                add(\"$.vc.credentialSubject.given_name\") \n                            })\n                            put(\"purpose\", \"The given name on your ID card.\")\n                        }\n                        addJsonObject {\n                            put(\"path\", buildJsonArray { \n                                add(\"$.vc.credentialSubject.family_name\") \n                            })\n                            put(\"purpose\", \"The family name on your ID card.\")\n                        }\n                        addJsonObject {\n                            put(\"path\", buildJsonArray { \n                                add(\"$.vc.credentialSubject.birthdate\") \n                            })\n                            put(\"purpose\", \"Your birth date.\")\n                        }\n                        addJsonObject {\n                            put(\"path\", buildJsonArray { \n                                add(\"$.vc.credentialSubject.national_identifier\") \n                            })\n                            put(\"purpose\", \"Your national identifier.\")\n                        }\n                    }\n                    put(\"fields\", fields)\n                }\n                put(\"constraints\", constraints)\n            }\n        }\n        val presentationDefinition = buildJsonObject {\n            put(\"id\", \"IDCardCredentials\")\n            put(\"input_descriptors\", inputDescriptors)\n        }\n        put(\"presentation_definition\", presentationDefinition)\n        put(\"client_metadata\", clientMetadata)\n    }\n    //highlight-start\n    // Sign the SIOPv2 Auth Request\n    val siopRequestJwtPayload = JwtClaimsSet.Builder()\n        .subject(issuerBearerDid.uri) // Issuer's DID\n        .issuer(issuerBearerDid.uri) // Issuer's DID\n        .issueTime(System.currentTimeMillis() / 1000) // Issued time\n        .expirationTime((System.currentTimeMillis() / 1000) + 86400) // Expiration time \n        .misc(\"request\", siopRequest.toString()) // Embed the SIOPv2 Auth request payload \n        .build()\n\n    try {\n        val jwtToken = Jwt.sign(issuerBearerDid, siopRequestJwtPayload)\n        // Send the SIOPv2 Auth Request in JAR format\n        val queryString = \"client_id=${URLEncoder.encode(issuerBearerDid.uri.toString(), \"UTF-8\")}&request=${URLEncoder.encode(jwtToken, \"UTF-8\")}\"\n\n        call.respondText(queryString, ContentType.Text.Plain)\n    } catch (err: Exception) {\n        println(\"Error signing the SIOPv2 request: ${err.message}\")\n        call.respond(HttpStatusCode.InternalServerError, \"Failed to generate JWT for SIOPv2 Authorization Request\")\n    }\n    //highlight-end\n}\n";