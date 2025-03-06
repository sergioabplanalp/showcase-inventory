import dotenv from 'dotenv';
import {Connection} from 'rabbitmq-client';

dotenv.config();

const rabbit = new Connection('amqp://guest:guest@localhost:5672');
rabbit.on('error', err => console.log(`RabbitMQ Connection error`, err));
rabbit.on('connection', () => console.log(`Connection successfully (re)established`));

const publisher = rabbit.createPublisher({
  confirm: true,
  maxAttempts: 2,
  exchanges: [{
    exchange: process.env.RABBITMQ_EXCHANGE_NAME,
    type: process.env.RABBITMQ_EXCHANGE_TYPE,
    durable: true
  }]
});

const sendMessage = async (payloadType: string, message: any) => {
  const envelope = {
    exchange: process.env.RABBITMQ_EXCHANGE_NAME,
    routingKey: process.env.RABBITMQ_ROUTING_KEY,
    contentType: 'application/json',
  };

  await publisher.send({...envelope, headers: {'__TypeId__': payloadType}}, message);
};

export {sendMessage};
