import {PrismaClient} from "@prisma/client"
import {Kafka} from "kafkajs"

const client = new PrismaClient();
const kafka = new Kafka({
    clientId:'outbox-processor',
    brokers: ['localhost:9092']
})
const TOPIC = 'Flow-events'

async function main() {
    const producer = kafka.producer();
    await producer.connect();

    while(1){
        const pending = await client.zapRunOutbox.findMany({
            take:7
        })

        producer.send({
            topic:TOPIC,
            messages:pending.map((task)=>{
                return{
                    value:task.zapRunId
                }
            })
        })
        await client.zapRunOutbox.deleteMany({
            where:{
                id:{
                    in:pending.map((t)=>t.id)
                }
            }
        })
    }
}
main()