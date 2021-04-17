const { SchemaRegistry } = require("@kafkajs/confluent-schema-registry");
const registry = new SchemaRegistry({ host: "http://localhost:8081" });

async function test() {
  const schemaId1 = await registry.getLatestSchemaId(
    "fip.common.RtValidateReqDto"
  );
  console.log("schemaId1", schemaId1);
  const schema1 = await registry.getSchema(schemaId1);
  console.log("schema1", schema1);

  const schemaId2 = await registry.getLatestSchemaId("fip.common.RtResDto");
  console.log("schemaId2", schema1);
  const schema2 = await registry.getSchema(schemaId2);
  console.log("schema2", schema2);

  const schemaId3 = await registry.getLatestSchemaId("RT_VALIDATE-value");
  console.log("schemaId3", schemaId3);
  const schema3 = await registry.getSchema(schemaId3);
  console.log("schema3", schema3);
}
void test();

// const dtoNew = await registry.encode(schemaId3, { req: dto });
// console.log("dtoNew", dtoNew);
