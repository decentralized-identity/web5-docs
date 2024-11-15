export default "exchangesApiProvider = ExchangesApiProvider()\nofferingsApiProvider = OfferingsApiProvider()\n\ntbDexServer = TbdexHttpServer(TbdexHttpServerConfig(\n    port = 8080,\n    pfiDid = pfiDid.uri,\n    exchangesApi = exchangesApiProvider,\n    offeringsApi = offeringsApiProvider\n))\n";