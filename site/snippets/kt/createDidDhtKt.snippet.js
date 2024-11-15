export default "//Creates a DID using the DHT method and publishes the DID Document to the DHT\nval didDht = DidDht.create(InMemoryKeyManager(), CreateDidDhtOptions(publish = true))\n\n//DID and its associated data which can be exported and used in different contexts/apps\nval portableDid = didDht.export()\n\n//DID string\nval did = didDht.uri\n\n//DID Document\nval didDocument = didDht.document\n\n";