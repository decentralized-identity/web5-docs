export default "val serviceToAdd = Service.Builder()\n  .id(\"tbdex\")\n  //highlight-start\n  .type(\"tbdex\")\n  .serviceEndpoint(listOf(\"https://example.com/callback\"))\n  //highlight-end\n  .build()\n\nval options = CreateDidDhtOptions(\n  publish = true,\n  services = listOf(serviceToAdd),\n)\n\nval walletDid = DidDht.create(keyManager, options)\n";