
# web worker pool

> 从maptalks中抽离的单独使用的web worker pool模块。 [maptalks worker pool源码](https://github.com/maptalks/maptalks.js/tree/master/src/core/worker)


### 安装
```
pnpm add mtk-worker-pool
```

### 使用示例

```ts
import { registerWorkerAdapter, worker } from 'mtk-worker-pool'

/**
 * 发送到worker的数据结构
 */
interface ISendToWorkerMsg {
  url: string
}

/**
 *从worker中返回的数据结构 
 */
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

/**
 * 注入到worker中的函数类型
 */
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

const workerKey = 'workertest'

/**
 * 注册worker
 */
registerWorkerAdapter(workerKey, fun1)

/**
 * 初始化actor
 */
const actor = new worker.Actor(workerKey)

const url = 'xxx'

// 消息通信数据格式
//  主线程到worker actor.send(data, buffers, callback, worker.id);
//  worker到主线程 postResponse(err, data, buffers);

console.log(actor)

/**
 * 发送数据到worker
 */
actor.send({ url }, [], (error: any, message: IWorkerPostResponseMsg) => {
  // 从worker中返回的数据
  console.log(message)
})

```

### Todo

- 重构代码使其支持**动态注入web worker**功能
- 完善类型提示和使用文档