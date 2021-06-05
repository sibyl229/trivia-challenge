import tw from 'twin.macro';
import { Route, Link } from 'react-router-dom';

export function App() {
  return (
    <>
      <div tw="text-4xl">zzzzz</div>
      <Route
        path="/"
        exact
        render={() => (
          <div>
            This is the generated root route.{' '}
            <Link to="/page-2">Click here for page 2.</Link>
          </div>
        )}
      />
      <Route
        path="/page-2"
        exact
        render={() => (
          <div>
            <Link to="/">Click here to go back to root page.</Link>
          </div>
        )}
      />
      {/* END: routes */}
    </>
  );
}
export default App;
