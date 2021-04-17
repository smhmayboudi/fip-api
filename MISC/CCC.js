// const avro = require("avro-js");
const avro = require("avsc");

// var type = avro.parse("./CCC.avsc");
var registry = {};
var typeRtValidateReqDto = avro.parse(
  "/Users/smhmayboudi/Developer/fip-api/libs/common/src/rt/dto/req/rt.validate.req.dto.avsc",
  {
    registry,
  }
);
var typeRtResDto = avro.parse(
  "/Users/smhmayboudi/Developer/fip-api/libs/common/src/rt/dto/res/rt.res.dto.avsc",
  {
    registry,
  }
);
var typeValidateDto = avro.parse(
  "/Users/smhmayboudi/Developer/fip-api/apps/fip-api/src/rt/rt.validate.dto.avsc",
  {
    registry,
  }
);

// var message = { message: "AAA_XXX" };
var message = {
  err: null,
  req: { userId: 0 },
  res: null,
};

const x = typeValidateDto.random();
console.log(x);
console.log(typeValidateDto.toString(x));
console.log(typeValidateDto.isValid(message));

var buffer = typeValidateDto.toBuffer(message);
console.log("CCC", "message => buffer", Array.prototype.toString.call(buffer));

var messageNew = typeValidateDto.fromBuffer(buffer);
console.log("CCC", "buffer => message", messageNew);

// ========================================
// ========================================
// ========================================
// ========================================

const DEFAULT_OFFSET = 0;

// Based on https://github.com/mtth/avsc/issues/140
// const collectInvalidPaths = (schema: Schema, jsonPayload: object) => {
//   const paths: any = [];
//   schema.isValid(jsonPayload, {
//     errorHook: (path) => paths.push(path),
//   });

//   return paths;
// };

const MAGIC_BYTE = Buffer.alloc(1);

const encode = (schema, registryId, jsonPayload) => {
  // let avroPayload;
  // try {
  //   avroPayload = schema.toBuffer(jsonPayload);
  // } catch (error) {
  //   error.paths = collectInvalidPaths(schema, jsonPayload);
  //   throw error;
  // }

  const registryIdBuffer = Buffer.alloc(4);
  registryIdBuffer.writeInt32BE(registryId, DEFAULT_OFFSET);

  // return Buffer.concat([MAGIC_BYTE, registryIdBuffer, avroPayload]);
  return Buffer.concat([MAGIC_BYTE, registryIdBuffer, buffer]);
};

// ========================================
// ========================================
// ========================================
// ========================================

const { Kafka, logLevel } = require("kafkajs");
const kafka = new Kafka({
  brokers: ["broker:29092"],
  clientId: "AAA",
  logLevel: logLevel.INFO,
});

async function producer() {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    messages: [
      {
        value: encode(0, 3, 0),
      },
    ],
    topic: "RT_VALIDATE",
  });
  await producer.disconnect();
}
void producer();

async function consumer() {
  const consumer = kafka.consumer({
    groupId: "AAA",
  });
  await consumer.connect();
  await consumer.subscribe({
    fromBeginning: true,
    topic: "RT_VALIDATE",
  });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("topic", topic);
      console.log("partition", partition);
      console.log("message", message);
      const aaaNew = pb.AAA.deserializeBinary(message.value);
      const message2 = aaaNew.getMessage();
      console.log("DATA.message =>", message2);
    },
  });
}
// void consumer();
