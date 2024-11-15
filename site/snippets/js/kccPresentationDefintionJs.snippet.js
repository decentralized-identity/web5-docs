export default "pd = {\n    id: \"presentation-definition-kcc\",\n    name: \"KYC Verification\",\n    purpose: \"We need to verify your customer status and necessary checks.\",\n    format: {\n      jwt_vc: {\n        alg: [\"ES256K\", \"EdDSA\"]\n      }\n    },\n    input_descriptors: [\n      {\n        id: \"known-customer-credential\",\n        name: \"Known Customer Credential\",\n        purpose: \"Please present your Known Customer Credential for verification.\",\n        constraints: {\n          fields: [\n            {\n              path: [\"$.type[*]\"],\n              filter: {\n                type: \"string\",\n                pattern: \"KnownCustomerCredential\"\n              }\n            },\n            {\n              path: [\"$.evidence[*].kind\"],\n              filter: {\n                type: \"string\",\n                pattern: \"sanction_screening\"\n              }\n            },\n            {\n              path: [\"$.credentialSubject.countryOfResidence\"],\n              filter: {\n                type: \"string\",\n                const: \"US\"\n              }\n            },\n            {\n              path: [\"$.issuer\"],\n              filter: {\n                type: \"string\",\n                const: \"did:dht:d4sgiggd3dwimo4ubki7spo45q5dazxphrizbxhcgapapcnzpouy\"\n              }\n            }\n          ]\n        }\n      }\n    ]\n};\n";