export default "var quote: Quote? = null\nvar close: Close? = null\n\n//Wait for Quote message to appear in the exchange\nwhile (quote == null) {\n  val exchange = TbdexHttpClient.getExchange(\n    pfiDid = rfq.metadata.to,\n    requesterDid = customerDid,\n    exchangeId = rfq.metadata.exchangeId\n  )\n\n  quote = exchange.find { it is Quote } as Quote?\n\n  if (quote == null) {\n    // Make sure the exchange is still open\n    close = exchange.find { it is Close } as Close?\n\n    if (close != null) { break }\n    else {\n      // Wait 2 seconds before making another request\n      Thread.sleep(2000)\n    }\n  }\n";