import { CONSUMER, RT } from "@fip/common";
import { HttpService, Logger } from "@nestjs/common";
import { KafkaOptions, Transport } from "@nestjs/microservices";

import { NestFactory } from "@nestjs/core";
import { RtConfigService } from "./rt.config.service";
import { RtModule } from "./rt.module";
import { logLevel } from "kafkajs";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(RtModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  const rtConfigService = app.get(RtConfigService);
  const httpService = app.get(HttpService);
  app.connectMicroservice<KafkaOptions>({
    options: {
      client: {
        // authenticationTimeout?: number
        brokers: async () => {
          const clusterResponse = await httpService
            .get("http://rest-proxy:8082/v3/clusters", {
              headers: {
                "Content-Type": "application/vnd.api+json",
              },
            })
            .toPromise();
          const clusterUrl = clusterResponse.data.data[0].metadata.self;
          const brokersResponse = await httpService
            .get(`${clusterUrl}/brokers`, {
              headers: {
                "Content-Type": "application/vnd.api+json",
              },
            })
            .toPromise();
          const brokers = brokersResponse.data.data.map(
            ({ host, port }) => `${host}:${port}`
          );
          return brokers;
        },
        clientId: RT,
        clientIdPostfix: "_SERVER",
        // connectionTimeout?: number
        // enforceRequestTimeout?: boolean
        // logCreator?: logCreator
        logLevel: logLevel.INFO,
        // reauthenticationThreshold?: number
        // requestTimeout?: number
        retry: {
          // maxRetryTime?: number
          // initialRetryTime?: number
          // factor?: number
          // multiplier?: number
          retries: Number.MAX_SAFE_INTEGER,
        },
        // sasl?: SASLOptions
        // socketFactory?: ISocketFactory
        // ssl?: tls.ConnectionOptions | boolean
      },
      consumer: {
        allowAutoTopicCreation: true,
        groupId: `${RT}_${CONSUMER}`,
        // heartbeatInterval?: number
        // maxBytes?: number
        // maxBytesPerPartition?: number
        maxInFlightRequests: 1,
        // maxWaitTimeInMs?: number
        // metadataMaxAge?: number
        // minBytes?: number
        // partitionAssigners?: PartitionAssigner[]
        // rackId?: string
        // readUncommitted?: boolean
        // rebalanceTimeout?: number
        // retry?: {
        //   maxRetryTime?: number
        //   initialRetryTime?: number
        //   factor?: number
        //   multiplier?: number
        //   retries?: number
        // } & { restartOnFailure?: (err: Error) => Promise<boolean> }
        // sessionTimeout?: number
      },
      // deserializer: Deserializer,
      producer: {
        allowAutoTopicCreation: true,
        // createPartitioner?: ICustomPartitioner
        idempotent: true,
        maxInFlightRequests: 1,
        // metadataMaxAge?: number
        retry: {
          // maxRetryTime?: number
          // initialRetryTime?: number
          // factor?: number
          // multiplier?: number
          retries: Number.MAX_SAFE_INTEGER,
        },
        // transactionTimeout?: number
        // transactionalId?: string
      },
      // run: {
      //   autoCommit?: boolean
      //   autoCommitInterval?: number | null
      //   autoCommitThreshold?: number | null
      //   eachBatch?: (payload: EachBatchPayload) => Promise<void>
      //   eachBatchAutoResolve?: boolean
      //   eachMessage?: (payload: EachMessagePayload) => Promise<void>
      //   partitionsConsumedConcurrently?: number
      // },
      send: {
        acks: -1,
        // compression?: CompressionTypes
        // messages: Message[]
        // timeout?: number
        // topic: string
      },
      subscribe: {
        fromBeginning: true,
        // topic: string | RegExp
      },
      // serializer: Serializer,
    },
    transport: Transport.KAFKA,
  });
  await app.startAllMicroservicesAsync();
  Logger.log("Nest microservice is listening", RT);
  await app.listenAsync(rtConfigService.servicePort);
  Logger.log("Nest application is listening", RT);
}
void bootstrap();
