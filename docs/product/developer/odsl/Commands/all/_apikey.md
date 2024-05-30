Command to manage your user API Keys

#### Syntax
```js
apikey: api-key (create (start="string")? (expires="string")? |delete) "name";
```
#### Description

An API Key is used as a password to authenticate you in OpenDataDSL from an external application that cannot use OAUTH2 or Azure Active Directory.   

##### Explanation of the syntax

*   The **name** is a string that is used to identify what you are going to use the key for
*   The **create** directive creates a key
    * You can add an optional start date for the key
    * You can add an optional expires date for the key
*   The **delete** directive deletes (revokes) the named key

:::info
After running the create command, the key is output into the debug console, make sure you copy the **key** as this is the only time you will see it.
:::

#### Examples

Create a key that starts now and never expires
```js
api-key create "mykey" 
```

Create a key that starts and a date and expires
```js
api-key create start="2024-05-01" expires="2024-12-31T23:59:59" "mykey"
```

Revoke a key
```js
api-key delete "mykey"
```

List all your keys
```js
print ${user:"me"}.keys
```
