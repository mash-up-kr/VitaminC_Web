import { CombineSuspenseDelays, SingleSuspenseDelays } from './Components';

const QueryTestPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SingleSuspenseDelays />
      <CombineSuspenseDelays />
    </main>
  );
};

export default QueryTestPage;
