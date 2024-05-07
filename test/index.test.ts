import { registerWorkerAdapter, worker } from '../src/index'
import { describe, it, expect } from 'vitest'

interface ISendToWorkerMsg {
  url: string
}

interface IWorkerPostResponseMsg {
  data: string
}

interface WorkerExportsFuncParam<T, K extends IWorkerPostResponseMsg> {
  initialize: (self: any) => void
  onmessage: (
    msg: {
      data: T
      callback: string
      workerId: number
      workerKey: string
      actorId: number
    },
    postResponse: (err: any, data: K, buffers: ArrayBuffer[]) => void
  ) => void
}

type WorkerExportsFunc = (exports: WorkerExportsFuncParam<ISendToWorkerMsg, IWorkerPostResponseMsg>) => void

const fun1: WorkerExportsFunc = (exports) => {
  exports.initialize = (self) => {
    console.log('worker init')
  }
  const canvas = new OffscreenCanvas(1, 1)
  const TILESIZE = 256

  exports.onmessage = (msg, postResponse) => {
    console.log(msg)
    const data = 'worker msg'
    postResponse(null, { data }, [])
  }
}

describe('web worker pool test', () => {
  it('function worker test', () => {
    const workerKey = 'workertest'

    registerWorkerAdapter(workerKey, fun1)

    const actor = new worker.Actor(workerKey)

    const url = 'xxx'
    /**
     * 消息通信数据格式
     * 主线程到worker: this.send(data, buffers, callback, worker.id)
     * worker到主线程: postResponse(err, data, buffers)
     */
    actor.send({ url }, [], (error: any, message: IWorkerPostResponseMsg) => {
      console.log(message)
    })
  })
})
