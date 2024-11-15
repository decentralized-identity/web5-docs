export default "private suspend fun postSiopResponse(responseUri: String, responsePayload: String) {\n    val url = URL(responseUri)\n    val connection = url.openConnection() as HttpURLConnection\n    connection.requestMethod = \"POST\"\n    connection.setRequestProperty(\"Content-Type\", \"application/json; utf-8\")\n    connection.setRequestProperty(\"Accept\", \"application/json\")\n    connection.doOutput = true\n\n    try {\n        OutputStreamWriter(connection.outputStream).use { outputStreamWriter ->\n            outputStreamWriter.write(responsePayload)\n            outputStreamWriter.flush()\n        }\n\n        // Check for successful response code or throw error\n        if (connection.responseCode == HttpURLConnection.HTTP_OK) {\n            val response = connection.inputStream.bufferedReader().use { it.readText() }\n            val responseData = Json.decodeFromString<IssuerResponse>(response)\n\n            handleIssuerResponse(responseData) // function shown in next step\n        } else {\n            throw Exception(\"Failed to send SIOP response. HTTP error code: ${connection.responseCode}\")\n        }\n    } finally {\n        connection.disconnect()\n    }\n}\n";