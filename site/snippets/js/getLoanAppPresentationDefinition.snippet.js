export default "const presentationDefinition = {\n  id: 'presDefIdloanAppVerification123',\n  name: 'Loan Application Employment Verification',\n  purpose: 'To verify applicant’s employment, date of birth, and name',\n  input_descriptors: [\n    // Employment Verification\n    {\n      id: 'employmentVerification',\n      purpose: 'Confirm current employment status',\n      constraints: {\n        fields: [\n          {\n            path: ['$.vc.credentialSubject.employmentStatus'],\n            filter: {\n              type: 'string',\n              pattern: 'employed',\n            },\n          },\n        ],\n      },\n    },\n    // Date of Birth Verification\n    {\n      id: 'dobVerification',\n      purpose: 'Confirm the applicant’s date of birth',\n      constraints: {\n        fields: [\n          {\n            path: ['$.vc.credentialSubject.dateOfBirth'],\n            filter: {\n              type: 'string',\n              format: 'date',\n            },\n          },\n        ],\n      },\n    },\n    // Name Verification\n    {\n      id: 'nameVerification',\n      purpose: 'Confirm the applicant’s legal name',\n      constraints: {\n        fields: [\n          {\n            path: ['$.vc.credentialSubject.name'],\n            filter: {\n              type: 'string'\n            }\n          }\n        ]\n      }\n    }\n  ]\n};\n";