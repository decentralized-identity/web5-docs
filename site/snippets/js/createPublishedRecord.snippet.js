export default "const {record} = await web5.dwn.records.create({\n  data: \"a published record\",\n  message: {\n    dataFormat: \"text/plain\",\n    //highlight-start\n    published: true\n    //highlight-end\n  }\n});\n";