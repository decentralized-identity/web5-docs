export default "import web5.sdk.dids.methods.jwk.DidJwk\nimport web5.sdk.dids.methods.dht.DidDht\nimport web5.sdk.dids.did.BearerDid\n// :prepend-end:\n\n/**\n * Tests backing the Import a DID Guide\n */\n\ninternal class HowToImportDidTest {\n  @Test\n  fun `export DID`() {\n    val keyManager = InMemoryKeyManager()\n    val didDht = DidDht.create(keyManager, CreateDidDhtOptions(publish = true))\n    val didJwk = DidJwk.create(keyManager)\n\n    // :snippet-start: exportDidKt\n    // export did:dht DID\n    val portableDhtDid = didDht.export()\n    // export did:jwk DID\n    val portableJwkDid = didJwk.export()\n    \n// export did:dht DID\nval portableDhtDid = didDht.export()\n// export did:jwk DID\nval portableJwkDid = didJwk.export()\n";