export default "\n    val revocableVC = VerifiableCredential.create(\n      type = \"StreetCred\",\n      issuer = issuerDid.uri,\n      subject = holderDid.uri,\n      data = StreetCredibility(localRespect = \"high\", legit = true),\n      // highlight-start\n      credentialStatus = StatusList2021Entry.builder()\n        .id(URI.create(\"https://example.com/credentials/status/1#94567\"))\n        .statusPurpose(\"revocation\")\n        .statusListIndex(\"94567\")\n        .statusListCredential(URI.create(\"https://example.com/credentials/status/1\"))\n        .build()\n      // highlight-end\n    )\n\n";