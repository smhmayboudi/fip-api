function registerSchema(filename) {
  const type = {
    name: "RtValidateDto",
    namespace: "fip.common",
    req: {
      name: "RtValidateReqDto",
      version: 1,
    },
    res: {
      name: "RtResDto",
      version: 1,
    },
  };
  const file = fs.readFileSync(filename);
  const cont = file
    .toString()
    .replace(/ /g, "")
    .replace(/\n/g, "")
    .replace(/NAME/g, type.name)
    .replace(/REQ/g, type.req)
    .replace(/RES/g, type.res);
  const schema = {
    references: [
      {
        name: type.req.name,
        subject: `${type.namespace}.${type.req.name}`,
        version: type.req.version,
      },
      {
        name: type.res.name,
        subject: `${type.namespace}.${type.res.name}`,
        version: type.res.version,
      },
    ],
    schema: cont,
    schemaType: "AVRO",
  };
  console.log("-- XXX", schema);
  // COMPATIBILITY BACKWARD
  const response = await this.api.Subject.register({
    subject,
    body: { schema: JSON.stringify(schema) },
  })
}

// ======================================== //
// ======================================== //
// ======================================== //
// ======================================== //

const fs = require("fs");
const path = require("path");

function process(startPath, filter) {
  console.log("-- START   ", startPath);
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }
  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      void process(filename, filter);
    } else if (filename.indexOf(filter) >= 0) {
      console.log("-- FILENAME", filename);
      registerSchema(filename);
    }
  }
}

void process(".", ".avsc");
