# React Use Promised State Hook

React Hook for storing state that's updated asynchronously.

## Usage

`usePromisedState` hook only accepts Promise objects as initial value.

`usePromisedState` returns a tuple with a Resource object and a "setMethod".

The "setMethod" accepts only Promise objects as it's parameter.

Resource object structure is as seen here:

```ts
type Resource<T> = {
  isReady: boolean;
  data: T | null;
  error: Error | null;
};
```

`Resource.isReady` is a boolean indicating if the last provided Promise is resolved/rejected (true) or is still pending (false).

`Resource.data` holds the result of the last Promise provided to the usePromisedState hook, it is null if a promise is pending.

`Resource.error` holds the error of the last Promise provided to the usePromisedState hook.

If the `Resource.error` is not null then the `Resource.data` will be always null, if the `Resource.data` is not null then the `Resource.error` will be always null.

#### Example

```tsx
import { usePromisedState } from "react-promised-state";

// Method for retrieving a string value from some API
const getTitleFromApi = (): Promise<string> => {
  return fetch("www.your-api-url.com", { method: "GET" }).then((resp) => resp.json());
};

const Component: React.FC = () => {
  // Use hook and set an initial value
  const [title, setTitle] = usePromisedState(Promise.resolve("Initial Value"));

  React.useEffect(() => {
    // fetch data and update the state
    setTitle(getTitleFromApi());
  }, []);

  if (title.isReady) return <div>{title.data}</div>;
  else if (title.error) return <div>An error occurred!</div>;
  else return <div>Loading...</div>;
};
```

### Suspense

`usePromisedState` supports the React Suspense component.

To use it with it usePromisedState should be located in a component outside the Suspense boundary and passed via props to a component within the Suspense boundary and there a `.read()` method should be called on the Resource object.

#### Example

```tsx
import { usePromisedState } from "react-promised-state";
import type { SuspenseReader } from "react-promised-state";

// Method for retrieving a string value from some API
const getTitleFromApi = (): Promise<string> => {
  return fetch("www.your-api-url.com", { method: "GET" }).then((resp) => resp.json());
};

const DisplayTitle: React.FC<{ title: SuspenseReader<string> }> = ({ title }) => {
  return <div>{title.read()}</div>;
};

const Component: React.FC = () => {
  // Use hook and set an initial value
  const [title, setTitle] = usePromisedState(Promise.resolve("Initial Value"));

  React.useEffect(() => {
    // fetch data and update the state
    setTitle(getTitleFromApi());
  }, []);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <DisplayTitle title={title} />
    </React.Suspense>
  );
};
```

## License

#### MIT
