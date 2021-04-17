const { SchemaRegistry } = require("@kafkajs/confluent-schema-registry");
const registry = new SchemaRegistry({
  host: "http://localhost:8081",
});

async function x() {
  const { readAVSCAsync } = require("@kafkajs/confluent-schema-registry");
  const schema = await readAVSCAsync(
    "/Users/smhmayboudi/Developer/fip-api/libs/common/src/at/dto/res/at.res.dto.avsc"
  );
  const reg = await registry.register(schema).catch((err) => {
    console.log("ERR", err);
  }); // { id: 2 }
  console.log("reg", reg);
}
void x();
