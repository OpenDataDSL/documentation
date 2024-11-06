A process execution can have one of the following statuses at any point during the execution:

* **triggered**
  > The process has been triggered and is waiting for a compute node to be allocated
* **start**
  > The process has started executing
* **running**
  > The process is currently running
* **waiting**
  > The process is waiting for a retry to happen
* **retrying**
  > The process is retrying a failed action
* **reschedule**
  > The process previously failed and has been rescheduled
* **failed**
  > The process execution failed
* **success**
  > The process execution was successful
* **warning**
  > The process execution was successful, but there were warning messages logged
