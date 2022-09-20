Send a batch of objects to a message queue

#### Syntax
```js
send variable (to queue)? (size INT)? (-noevent)?
```
#### Description

The send command sends a [batch](/docs/odsl/variable/batch) variable to a [message queue](/docs/odsl/dm/queues) in order to be processed by either the data loader or an external application.

If no queue name is specified, the batch is sent to your default queue.

##### Options

**TO queue**

You can optional specify the name of the queue to send the batch to.

**SIZE INT**

You can override the default number of items sent per message using the size command

**-noevent**

Add this option if you don’t want to trigger downstream processes, exports etc. from the sending of this message. This would be usually done if you are back-filling some historic data and only require that the data is added.

#### Examples

```js
// Create a batch
batch=PROCESS.createBatch()

// Add some objects to the batch
...

// Send to the default queue
send batch

// Send the batch to the queue named 'myqueue'
send batch to myqueue

// Send the batch to the queue in batches of 10 objects at a time
send batch size 10 

// Send the batch to update but not trigger downstream events
send batch -noevent
```
