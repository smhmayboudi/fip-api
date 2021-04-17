const {
  SchemaRegistry,
  readAVSCAsync,
} = require("@kafkajs/confluent-schema-registry");

const schemaRegistry = new SchemaRegistry({
  host: "http://localhost:8081",
});

async function registerSchema(filename) {
  const schema = await readAVSCAsync(filename).catch((reason) =>
    console.error("READ REASON", reason)
  );
  const register = await schemaRegistry
    .register(schema)
    .catch((reason) => console.log("REGISTER REASON", reason));
  console.error("-- REGISTER", register);
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
      void registerSchema(filename);
    }
  }
}

void process("../libs/common/src", ".avsc");
