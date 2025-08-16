import {Kafka} from "kafkajs"

const kafka = new Kafka({
    clientId:'outbox-processor',
    brokers: ['localhost:9092']
})
const TOPIC = 'Flow-events'

async function main() {
    const consumer = kafka.consumer({groupId:'main-Worker'})
    await consumer.connect()
    
    await consumer.subscribe({topic:TOPIC,fromBeginning:true})
    
    await consumer.run({
      autoCommit:false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      })

      await consumer.commitOffsets([{ //This takes care of the below mentioned problem
        topic:TOPIC,
        partition:partition,
        offset:(parseInt(message.offset)+1).toString()
      }])
    },
  })
}


// At this point of implementation there is no acknowledgement by the worker that the task has been completed , which will cause problems if suppose the worker dies before completing
// the task as we'll think it's complete because it's been popped off of kafka queue
main()