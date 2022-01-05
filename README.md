# React Use Promised State Hook

React Hook for storing state that's updated asynchronously.

## Usage

`usePromisedState` hook can accept a value, a function returning a value or a function returning a Promise resolving a value as it's initial parameters and as SetStateAction argument, SetStateAction argument can additionally be a regular Promises.

`usePromisedState` returns a 2-tuple with a PromisedState object and a SetStateAction dispatch function.

PromisedState object structure is as seen here:

```ts
type PromisedState<T> = {
  isPending: boolean;
  data: T | null;
  error: Error | null;

  read(): T;
};
```

- `PromisedState.isPending` is a boolean indicating if the last provided SetStateAction Promise is resolved/rejected (false) or is still pending (true). Is always false if the last SetStateAction is not a Promise.

- `PromisedState.data` holds the actual state value. It is not set to empty when a dispatched promise is pending.

- `PromisedState.error` holds the error rejected by the last dispatched Promise or SetStateAction function. It is not set to empty when a dispatched promise is pending.

- `PromisedState.read()` is a function that returns the value stored in the `data` property if no error is present and not pending. If a dispatched promise is pending it will throw that promise. If an error is present it will throw that error. It's intended to be used with the React.Suspense component.

### Initiation

`usePromisedState` accepts one of the three initial value types:

- regular value, like a string, number, array or object

```ts
const [state, setState] = usePromisedState("value"); // state: PromisedState<string>
// or
const [state, setState] = usePromisedState(123); // state: PromisedState<number>
```

- a generator function returning a regular value

```ts
const [state, setState] = usePromisedState(() => ["value"]); // state: PromisedState<string[]>
// or
const [state, setState] = usePromisedState(() => new Set<number>()); // state: PromisedState<Set<number>>
```

- a generator function returning a Promise

```ts
const [state, setState] = usePromisedState(() => Promise.resolve({ foo: "foo" })); // state: PromisedState<{ foo: string }>
// or
const [state, setState] = usePromisedState(() => Promise.resolve([1, 2, 3])); // state: PromisedState<number[]>
```

### SetStateAction Dispatch Function

The dispatch function of the promised state can accept:

- regular value like a string, number, array or object

```ts
const [state, setState] = usePromisedState<string>(); // state: PromisedState<string | number>

setState("hello world");
```

- a generator function returning a regular value

```ts
const [state, setState] = usePromisedState<string[]>(); // state: PromisedState<string[]>

setState((currentState: PromisedState<string[]>) => ["foo", "bar", "baz"]);
```

- a generator function returning a Promise

```ts
const [state, setState] = usePromisedState<{ foo: string }>(); // state: PromisedState<{ foo: string }>

setState((currentState: PromisedState<{ foo: string }>) => Promise.resolve({ foo: "foo bar baz" }));
```

- a Promise

```ts
const [state, setState] = usePromisedState<Set<number>>(); // state: PromisedState<Set<number>>

setState(Promise.resolve(new Set([1, 2, 3])));
```

## Examples

```tsx
import { usePromisedState } from "react-promised-state";

// Method for retrieving a string value from some API
const getTitleFromApi = (): Promise<string> => {
  return fetch("www.your-api-url.com", { method: "GET" }).then((resp) => resp.text());
};

const Component: React.FC = () => {
  // Use hook and set an initial value
  const [title, setTitle] = usePromisedState("Initial Value");

  React.useEffect(() => {
    // fetch data and update the state
    setTitle(getTitleFromApi());
  }, []);

  if (title.isPending) <div>Loading...</div>;
  else if (title.error) return <div>An error occurred!</div>;
  else return <div>{title.data}</div>;
};
```

### React Suspense

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
  // Set a generator that will fetch the title as the initial value
  const [title, setTitle] = usePromisedState(() => getTitleFromApi());

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <DisplayTitle title={title} />
    </React.Suspense>
  );
};
```

## License

#### MIT
