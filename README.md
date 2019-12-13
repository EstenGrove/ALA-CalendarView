# AdvantageTracker v1 Iteration

This is the working version 1 of the ALA Tracker. It includes minor refactors for:

- Global state object's shape
- Updated Initial fetch for residents and the user's profile.

## Tasks (To Do's)

- Refactor various areas
- Consider major restructuring of application routing
- Consider using lazy loading of the app using React Lazy to prevent rendering needless UI:

```javascript
const AuthenticatedApp = React.lazy(() => import("./somefile"));
const NonAuthenticatedApp = React.lazy(() => import("./someotherfile"));

function App() {
  const { authData } = useContext(AuthContext);
  return authData.isAuthenticated ? (
    <AuthenticatedApp />
  ) : (
    <NonAuthenticatedApp />
  );
}
```
