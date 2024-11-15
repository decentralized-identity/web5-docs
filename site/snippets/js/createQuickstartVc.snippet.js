export default "const vc = await VerifiableCredential.create({\n  type: 'Web5QuickstartCompletionCredential',\n  issuer: aliceDid,\n  subject: aliceDid,\n  data: {\n    name: 'Alice Smith',\n    completionDate: new Date().toISOString(),\n    expertiseLevel: 'Beginner'\n  }\n});\n";