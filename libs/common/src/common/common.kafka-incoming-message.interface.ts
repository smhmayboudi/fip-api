export interface CommonKafkaIncomingMessageInterface<T = any> {
  attributes: number;
  headers: Record<string, any>;
  key: any;
  offset: string;
  partition: number;
  size: number;
  timestamp: string;
  topic: string;
  value: T;
}
