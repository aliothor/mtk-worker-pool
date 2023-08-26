import Actor from './worker/Actor'
import { registerWorkerAdapter } from './worker/Worker'

const worker = { Actor: Actor }

/**
 * 注册adapter时使用的函数参数类型
 */
export interface WorkerExportsFuncParam<T, K> {
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

export { registerWorkerAdapter, worker }
