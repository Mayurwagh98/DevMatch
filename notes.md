# Express.js Route Examples

## Basic Routes

```javascript
app.use("/", (req, res) => {
  res.send("Hello World");
});

app.get("/mayur", (req, res) => {
  res.send("Hello Mayur");
});
```

## Query Parameters

```javascript
app.post("/mayur", (req, res) => {
  console.log(req.query);
  res.send("Hello Mayur");
});
```

## Route Parameters

```javascript
app.post("/mayur/:userId", (req, res) => {
  console.log(req.params);
  res.send("Hello Mayur");
});
```

## Middleware Example

```javascript
app.get("/user", auth, (req, res) => {
  res.send("Hello User");
});
```

## Error Handling with Next

```javascript
app.use(
  "/",
  (err, req, res, next) => {
    console.log("error:", err);
    // next();
  },
  (req, res) => {
    res.send("Hello next response");
  }
);
```

# HTTP PUT vs PATCH Methods

## PUT - Complete Resource Replacement

- Endpoint: `PUT /api/users/123`
- Requires the complete resource representation
- Request body must contain ALL fields:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "hashedPassword",
  "age": 30
}
```

**Note:** If any field is missing, it will be set to null/undefined

## PATCH - Partial Resource Modification

- Endpoint: `PATCH /api/users/123`
- Allows partial updates to the resource
- Request body contains ONLY fields to update:

```json
{
  "age": 31,
  "email": "john.doe@example.com"
}
```

**Note:** Other fields remain unchanged

## Key Differences

1. PUT requires the complete resource representation
2. PATCH allows partial updates to the resource
3. PUT is idempotent (same result for multiple identical requests)
4. PATCH might not be idempotent depending on the implementation

## Best Practices

- Use PUT when updating an entire resource
- Use PATCH when updating specific fields
- Always validate the request body
- Return appropriate status codes (200 OK or 204 No Content)
