#!/bin/sh

curl -X POST -H "Content-Type: application/vnd.schemaregistry.v1+json" --data-binary @AAA_req.json http://schema-registry:8081/subjects/rt.validate.req.dto.proto/versions
curl -X POST -H "Content-Type: application/vnd.schemaregistry.v1+json" --data-binary @AAA_res.json http://schema-registry:8081/subjects/rt.res.dto.proto/versions
curl -X POST -H "Content-Type: application/vnd.schemaregistry.v1+json" --data-binary @AAA_total.json http://schema-registry:8081/subjects/AT_VALIDATE.reply-value/versions

curl -X POST -H "Content-Type: application/vnd.schemaregistry.v1+json" --data-binary @AAA.json http://schema-registry:8081/subjects/AAA-value/versions

docker-compose exec broker kafka-console-consumer --bootstrap-server broker:29092 --property schema.registry.url="http://schema-registry:8081" --topic AAA --from-beginning --skip-message-on-error
docker-compose exec broker kafka-console-producer --bootstrap-server broker:29092 --property schema.registry.url="http://schema-registry:8081" --topic AAA



docker-compose exec schema-registry kafka-protobuf-console-consumer --bootstrap-server broker:29092 --property schema.registry.url="http://schema-registry:8081" --property value.schema.id="1" --topic AAA --from-beginning --skip-message-on-error
docker-compose exec schema-registry kafka-protobuf-console-producer --bootstrap-server broker:29092 --property schema.registry.url="http://schema-registry:8081" --property value.schema.id="1" --topic AAA

protoc --proto_path=. --js_out=import_style=commonjs:. AAA.proto
protoc --proto_path=. --js_out=import_style=commonjs_strict:. AAA.proto
protoc --proto_path=. --js_out=library=AAA_pb:. AAA.proto



curl -X POST -H "Content-Type: application/vnd.schemaregistry.v1+json" --data-binary @rt.validate.dto.json http://schema-registry:8081/subjects/AAA-value/versions

docker-compose exec schema-registry kafka-avro-console-consumer --bootstrap-server broker:29092 --property schema.registry.url="http://schema-registry:8081" --property value.schema.id="41" --topic RT_VALIDATE --from-beginning --skip-message-on-error
docker-compose exec schema-registry kafka-avro-console-producer --bootstrap-server broker:29092 --property schema.registry.url="http://schema-registry:8081" --property value.schema.id="41" --topic RT_VALIDATE
