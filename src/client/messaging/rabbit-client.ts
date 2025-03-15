import {Connection} from 'rabbitmq-client';
import config from '../../../config';

const rabbit = new Connection(`amqp://${config.rabbitmq.username}:${config.rabbitmq.password}@${config.rabbitmq.host}:${config.rabbitmq.port}`);
rabbit.on('error', err => console.log(`RabbitMQ Connection error`, err));
rabbit.on('connection', () => console.log(`Connection successfully (re)established`));

const publisher = rabbit.createPublisher({
  confirm: true,
  maxAttempts: 2,
  exchanges: [{
    exchange: config.rabbitmq.exchange.name,
    type: config.rabbitmq.exchange.type,
    durable: true
  }]
});

const sendMessage = async (payloadType: string, message: any) => {
  const envelope = {
    exchange: config.rabbitmq.exchange.name,
    routingKey: config.rabbitmq.routing_key,
    contentType: 'application/json',
  };

  await publisher.send({...envelope, headers: {'__TypeId__': payloadType}}, message);
};

export {sendMessage};
