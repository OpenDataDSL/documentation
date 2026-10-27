Runs the quality checks of an object

#### Syntax
```js
(results =)? check object (save)?

(results =)? check object (save)?
    profile for checkname (parameter (, parameter)*)?
end
```

#### Description

Runs the quality check constraints declared on the object's [type](/docs/odsl/variable/declaredtype) and returns the results. With **save**, the object is saved with the results. In the second form, you list the checks to run on the object's data instead: each line names a data property (profile), the check to run and its parameters.
